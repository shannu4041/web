import {
  Component, OnInit, ViewEncapsulation, ViewChild, EventEmitter, Output,
  trigger, state, style, transition, animate, keyframes, Renderer2
} from '@angular/core';
import { MapService } from "../../services/map.service";
import { LocationService } from "../../services/location.service";
import { adminTrackerModel } from "../../models/tracker.model";
import { Location } from "../../models/location.model";
import { pagingModel } from '../../mastercomponents/shareddata/entities/pagingModel';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { vehicleModel } from '../../models/vehicle.model';
import { InfoWindow, DrawingManager, Circle } from '@ngui/map';
import { } from '@types/googlemaps';
import { businessGroup } from '../../models/businessgroup.model';
import { businessUnit } from '../../models/businessunit.model';
import { Map } from '../../models/map.model';
import { search } from '../../models/search.model';
import { forEach } from '@angular/router/src/utils/collection';
import { toString } from '../../mastercomponents/ngbcomponents/util/util';
import { debug } from 'util';
import './markerclusterer';
declare var MarkerClusterer: any;
declare let toastr;
declare let mLayout: any;
declare let child: any;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('formTrigger', [
      state('out', style({
        opacity: 0.5,
        transform: 'translateX(0)'
      })),
      transition('void=>*', [
        animate(1000, keyframes([
          style({
            transform: 'translateX(100px)',
            opacity: 1,
            offset: 0
          }),
          style({
            transform: 'translateX(50px)',
            opacity: 1,
            offset: 0.3
          }),
          style({
            transform: 'translateX(20px)',
            opacity: 1,
            offset: 0.7
          }),
          style({
            transform: 'translateX(0px)',
            opacity: 1,
            offset: 1
          })
        ]))
      ]),
      transition('*=>void', [
        animate(1000, style({
          transform: 'translateX(100px)',
          opacity: 1
        }))
      ])
    ]
    )]
})

export class MapsComponent implements OnInit {
  summaryViewTabIndex:number = 1;

  trackerList: adminTrackerModel[];
  locations: Location[];
  map: Map = new Map();
  pageData: pagingModel = new pagingModel();
  search: search = new search();
  paging: any;
  paths: any = [];
  vehiclesList: vehicleModel[];
  selectedId: number;
  showMap: boolean = false;
  markedVehicle: boolean = false;
  checkedBoxVehicle: boolean = false;
  markedLocation: boolean = false;
  checkedBoxLocation: boolean = false;
  showfilterPopUP: boolean = false;
  @ViewChild('showfilterpopup') filterpopup;
  filterpopupwindow: NgbModalRef;
  showRefreshlabel: boolean = true;
  positions = [];
  locationPostions = [];
  pageSize = 20;
  showSummary: boolean = false;
  vehicleIcon: boolean = false;
  locationIcon: boolean = false;
  routeIcon: boolean = false;
  GeoCoordinates = [];
  polydata = [];
  type = [];

  markerdata = [];
  iconUrl = "../../../assets/images/truck.png";
  
  startMarker: any;
  startMarkerLat:any;
  endVal: number;
  endMarker: any;
  endMarkerLng:any;
  startMarkerPosition: any;
  endMarkerPosition: any;
  state = "shrunk";
  selectedOverlay;
  newLocationGeoCoordinates: any;
  newLocationMarker;
  newLocationGeofence;
  centerPoints
  radius;
  bussinessgroup: businessGroup[] = [];
  busssinessunit: businessUnit[] = [];
  currentVehicles: any;
  currentTrips: any;
  blackCar = '../../../assets/images/blackcar.png'
  redCar = '../../../assets/images/redcar.png'
  greenCar = '../../../assets/images/greenCar.png'
  showFilter: boolean = true;
  filterWidth: string = "300px";
  totalrecords: number;
  showFilterIconClose: boolean = false;
  PolyGeoCoordinates: any;
  newLocationPopup: boolean = false;
  tab_pane: boolean = false;
  filterIcon: boolean = false;
  @ViewChild(DrawingManager) drawingManager: DrawingManager;
  @ViewChild(Circle) circle: Circle;
  label: any;
  flag: any;
  vehicleIds: any[] = [];
  vehicleobj: any;
  currentTripHistory: boolean = false;
  drawingManagerMode: string = 'marker';
  markerCluster: any;
  mapObject: any;
  openInfoWindow: string;
  summaryViewHeight: number;
  alertWhen:any=[{"id":1, "name":"Enters"},{"id":2, "name":"Leaves"}];
  alertType:any=[{"id":1, "name":"Sms"},{"id":2, "name":"Email"},{"id":3, "name":"Notification"}];
  alerts:any;
  alertTypes:any;
  from_date:any;
  to_date:any;
  from_time:any;
  to_time:any;
  marker = {
    id: null,
    display: true,
    lat: null,
    lng: null
  };

  constructor(private _mapservice: MapService, private _locationservice: LocationService,
    private modalService: NgbModal, private renderer: Renderer2) {
    this.summaryViewHeight = window.innerHeight - 210;

    if (!document.body.classList.contains("m-brand--minimize")) {
      this.renderer.addClass(document.body, 'm-brand--minimize');
      this.renderer.addClass(document.body, 'm-aside-left--minimize');
      this.renderer.addClass(document.getElementById("m_aside_left_minimize_toggle"), 'm-brand__toggler--active');
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.getElementById("m_aside_left_minimize_toggle"), 'm-brand__toggler--active');
  }

  ngOnInit() {

    this.drawingManager['initialized$'].subscribe(dm => {
      google.maps.event.addListener(dm, 'overlaycomplete', event => {
        event.target.setDrawingMode(null);
        
        this.newLocationPopup = true;
        this.redrawMapCluster();

        if (event.type == google.maps.drawing.OverlayType.MARKER) {
          this.newLocationGeoCoordinates = event.overlay.getPosition();
          this.newLocationMarker = event.overlay;
        }
        if (event.type == google.maps.drawing.OverlayType.POLYGON) {
          this.PolyGeoCoordinates = event.overlay.getPath().getArray();
          this.newLocationGeofence = event.overlay;
        }
      });
    });
    
    this.showHideVehicleFeature();
  }
  deleteSelectedOverlay() {
    if(this.newLocationMarker){
      this.newLocationMarker.setMap(null);
      delete this.newLocationMarker;
    }
    if(this.newLocationGeofence){
      this.newLocationGeofence.setMap(null);
      delete this.newLocationGeofence;
    }
  }
  onMapReady(map) {
    this.mapObject = map;
    console.log('map', map);
    console.log('markers', map.markers);  // to get all markers as an array 
  }

  onMarkerInit(marker) {
    /*
    console.log('marker', marker);
    this.markerCluster = new MarkerClusterer(this.mapObject, this.mapObject['markers'],
      { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }
    );*/
  }

  redrawMapCluster() {
    setTimeout(() => {
      if (this.mapObject != null && this.mapObject != undefined &&
        this.mapObject.markers != undefined && this.mapObject.markers != null) {
        
        if (this.markerCluster != undefined) {
          this.markerCluster.clearMarkers();
        }

        if (!this.newLocationPopup) {
          this.centerMapFromMarkers();

          this.markerCluster = new MarkerClusterer(this.mapObject, this.mapObject.markers,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }
          );
        }
      }
    }, 1000);
  }

  centerMapFromMarkers() {
    let bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();
    for (let marker of this.mapObject.markers) {
      bounds.extend(marker.getPosition());
    }

    this.mapObject.fitBounds(bounds);

    setTimeout(() => {
      console.log('Map Center - ' + bounds.getCenter().lat() + "," + bounds.getCenter().lng());
      this.mapObject.setCenter(bounds.getCenter());
    }, 1000);
  }

  //#region Filters
  getBussinessGrouplist() {
    this._mapservice.getBusinessGroupsList().subscribe((response: any) => {
      this.bussinessgroup = response.data;
    })
  }

  getBusinessUnitsList(id, event) {
    this._mapservice.getBusinessUnitList(id).subscribe((response) => {
      this.busssinessunit = response.data;
    })
  }
  //#endregion

  //#region Show Hide Finctions
  showHideVehicleFeature() {
    if (this.vehicleIcon) {
      this.vehicleIcon = false;
      this.paths = [];
      this.startMarkerPosition = [];
      this.endMarkerPosition = [];
      this.positions = [];

      if (this.summaryViewTabIndex == 1) {
        if (this.locationIcon) {
          this.summaryViewTabIndex = 2;
        } else {
          this.summaryViewTabIndex = 3;
        }
      }

    } else {
      this.vehicleIcon = true;
      this.showSummary = true;
      this.getCurrentVehicles(false);
      this.getBussinessGrouplist();
      this.getVehiclesList();
      this.summaryViewTabIndex = 1;
    }
    this.redrawMapCluster();
  }

  showHideLocationFeature() {
    if (this.locationIcon) {
      this.locationIcon = false;
      this.locationPostions = [];
      this.GeoCoordinates = [];
      this.polydata = [];
      this.markerdata = [];
      if (this.summaryViewTabIndex == 2) {
        if (this.vehicleIcon) {
          this.summaryViewTabIndex = 1;
        } else {
          this.summaryViewTabIndex = 3;
        }
      }
    } else {
      this.locationIcon = true;
      this.showSummary = true;
      this.getGeoCoordinates(false);
      this.summaryViewTabIndex = 2;
    }
    this.redrawMapCluster();
  }

  showHideTripFeature() {
    if (this.routeIcon) {
      this.routeIcon = false;
      this.paths = [];
      this.startMarkerPosition = [];
      this.endMarkerPosition = [];
      this.currentTrips = [];

      if (this.summaryViewTabIndex == 3) {
        if (this.vehicleIcon) {
          this.summaryViewTabIndex = 1;
        } else {
          this.summaryViewTabIndex = 2;
        }
      }

    } else {
      this.routeIcon = true;
      this.showSummary = true;
      this.getCurrentTrips();
      this.summaryViewTabIndex = 3;
    }
    this.centerMapFromMarkers();
  }

  summaryShowAndHide() {
    this.showSummary = !this.showSummary;
  }
  //#endregion

  //#region Map Data Functions
  getVehiclesList() {
    this._mapservice.getVehicles().subscribe((response: any) => {
      if (response.success) {
        this.vehiclesList = response.data;
        for (let vehicleId of this.vehiclesList) {
          this.label = vehicleId.registration_number;
          this.flag = vehicleId.id;
          this.vehicleIds.push({ label: this.label, flag: this.flag });
        }
      }
    });
  }

  getCurrentTrips() {
    this.currentTripHistory = true;
    this.showFilterIconClose = false;
    this.map = { pageSize: -1, page: 0, sortDirection: "desc", search: this.search, vehicleobj: this.vehicleobj }
    this._mapservice.getCurrentTrips(this.map).subscribe((response) => {
      if (response.success) {
        this.currentTrips = response.data;
        this.totalrecords = response.totalrecords;
        this.map = {};
        this.search = {};
        this.vehicleobj = null;
      } else {
        toastr.warning(response.data, response);
        this.currentTrips = [];
      }
    })
  }


  getTripsHistory(trip_id: number) {
    //this.routeIcon = true;
    this._mapservice.getVehicleTripsLocation(trip_id).subscribe((response: any) => {
      if (response.success) {
        //this.showSummary = true;
        this.paths = response.data;
        this.startMarker = this.paths[0];
        this.startMarkerLat = this.paths[0].lat;
        this.endVal = this.paths.length - 1;
        this.endMarker = this.paths[this.endVal];
        this.endMarkerLng=this.paths[this.endVal].lng;
        this.startMarkerPosition = [this.startMarker];
        this.endMarkerPosition = [this.endMarker];
        let bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();
        bounds.extend(new google.maps.LatLng(this.paths[0].lat, this.paths[0].lng));
        bounds.extend(new google.maps.LatLng(this.paths[this.endVal].lat, this.paths[this.endVal].lng));

        this.mapObject.fitBounds(bounds);

        setTimeout(() => {
          console.log('Map Center - ' + bounds.getCenter().lat() + "," + bounds.getCenter().lng());
          this.mapObject.setCenter(bounds.getCenter());
        }, 1000);
      }
    });
  }

  //#endregion

  //#region Map Related Functions
  addMapLocation() {
    this._locationservice.addMapLocation({ "markergeometry": this.newLocationGeoCoordinates, "polygeometry": this.PolyGeoCoordinates, "business": this.map }).subscribe((response) => {
      if (response.success) {
        toastr.success(response.message, response);
        this.newLocationPopup = false;
        this.deleteSelectedOverlay();
        this.getGeoCoordinates();
        this.locationIcon=true;
        this.showSummary = true;
        this.summaryViewTabIndex = 2;
      } else {
        toastr.warning(response.message, response);
      }
    }, (error) => {
      toastr.warning("Something is wrong", error);
    });
  }
  //#endregion


  togglePopUp() {
    this.showfilterPopUP = !this.showfilterPopUP;
    if (this.showfilterPopUP) {
      this.filterpopupwindow = this.modalService.open(this.filterpopup, { size: 'lg' });
    } else {
      this.filterpopupwindow.close();
      //this.paging.search={};
    }
  }

  onIdle(event) {
    console.log('map', event.target);
  }

  onMapClick(event) {
    //this.positions.push(event.latLng);
  }
  onMarkerClicked(e, id: number) {
    if (this.openInfoWindow != undefined && this.openInfoWindow != null && e.target.nguiMapComponent.infoWindows != null
      && e.target.nguiMapComponent.infoWindows[this.openInfoWindow] != undefined) {
      e.target.nguiMapComponent.infoWindows[this.openInfoWindow].close();
    }
    if (e.target.nguiMapComponent.infoWindows != null
      && e.target.nguiMapComponent.infoWindows['iw-' + id.toString()] != undefined) {
      this.openInfoWindow = 'iw-'+id.toString();
      e.target.nguiMapComponent.openInfoWindow(this.openInfoWindow, e.target);
    }
  }
  getCurrentTripHistory(e) {
    console.log(e)
    /* console.log(id);
    this.selectedId=id; */
    e.target.nguiMapComponent.openInfoWindow('iw', e.target);

  }
  hideMarkerInfo() {
    this.marker.display = !this.marker.display;
  }
  
  
  showFilters() {
    this.tab_pane = true;
    this.filterIcon = true;
  }
  hideFilters() {
    this.tab_pane = false;
    this.filterIcon = false;
  }

  getTripsByVehicle() {
    this.paths = [];
    this.startMarkerPosition = [];
    this.endMarkerPosition = [];
    this._mapservice.getTripsByVehicle().subscribe((response) => {
      if (response.success) {
        this.positions = response.data;
      }
    });
  }

  getGeoCoordinates(lodeMore = false) {
    this.showFilterIconClose = false;
    this.GeoCoordinates = [];
    this.locationPostions = [];
    //this.markerdata=[];
    this.polydata = [];
    this.map = { pageSize: -1, page: 0, sortDirection: "desc", search: this.search }



    this._locationservice.getAllGeoCoordinates(this.map).subscribe((response) => {
      if (response.success) {
        this.GeoCoordinates = response.data;

        //this.GeoCoordinates=response.data;
        this.totalrecords = response.totalrecords;
        this.map = {};
        this.search = {};
        for (let o of this.GeoCoordinates) {

          if (o.address_info != null) {
            this.locationPostions.push([o.address_info.lat, o.address_info.lng]);
            //console.log(this.markerdata);	
          }
          /* if(o.type == "marker"){
              lat = o.address_info.lat;
              lng = o.address_info.lng;
              this.markerdata.push([lat, lng]); 
              //console.log(this.markerdata);	
          } */
          if (o.type == "polygon" && o.geometry != null && o.geometry.length > 0) {
            let pdata = [];
            for (let p of o.geometry) {
              pdata.push({ "lat": p.lat, "lng": p.lng});
              //this.polydata = [{ "lat": 31.1112611595, "lng": 39.5620944687 }, { "lat": 30.013924578, "lng": 40.8365085312 }, { "lat": 30.5830621945, "lng": 45.4068210312 }, { "lat": 33.2313276519, "lng": 42.3745944687 }];
              //console.log(this.polydata);
            }

            if (pdata.length > 0) {
              this.polydata.push(pdata);
            }

            //this.polydata.pop();
          }
        }
      } else {
        toastr.warning(response.data, response);
        //this.totalrecords=response.totalrecords;
        this.GeoCoordinates = [];
      }
      this.redrawMapCluster();
    })
  }
  
  getCurrentVehicles(lodeMore = false) {
    this.showFilterIconClose = false;
    this.map = { pageSize: -1, page: 0, sortDirection: "desc", search: this.search, vehicleobj: this.vehicleobj }

    this._mapservice.getCurrentVehicles(this.map).subscribe((response) => {
      if (response.success) {
        this.positions = response.data;
        
        this.totalrecords = response.totalrecords;
        this.map = {};
        this.search = {};
        this.vehicleobj = null;
        
      } else {
        toastr.warning(response.data, response);
        this.positions = [];
      }
      this.redrawMapCluster();
    })
  }
 /*  filterVisibility() {
    this.showFilterIconClose = true;
  } */
  resetSearch() {
    this.map = {};
    this.vehicleobj = {};
    this.search = {};
    this.getCurrentVehicles();

  }

  resetTripsSearch() {
    this.map = {};
    this.vehicleobj = {};
    this.search = {};
    this.getCurrentTrips();
  }
  resetLocation() {
    this.search = {};
    this.getGeoCoordinates();
  }
  cancelButtonClick() {
    this.newLocationPopup = false;
    this.deleteSelectedOverlay();
    this.newLocationGeoCoordinates = null;
    this.redrawMapCluster();
	}
}
