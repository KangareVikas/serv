import { Component } from '@angular/core';
import { Screen } from 'app/screen';
declare var window: any;

@Component({
  selector: 'screen-tickets-viewincident_phoneportrait',
  templateUrl: 'viewincident.html'
})
export class tickets_viewincident_PhonePortrait extends Screen {
    data: any;
    services: object;

  ngOnInit(): void {
    super.ngOnInit();
    // Logic to run when the screen loads goes here.

    this.services = {
        "Access Management": {
            icon: "access_management_icon.png",
            bg: "access_bg.png"
        },
        "Cloud Services": {
            icon: "cloud_services_icon.png",
            bg: "cloud_services_bg.png"
        },
        "Database Services": {
            icon: "database_services_icon.png",
            bg: "database_services_bg.png"
        },
        "Enabling IT": {
            icon: "enabling_IT_icon.png",
            bg: "enabling_IT_bg.png"
        },
        "Enterprise Services": {
            icon: "enterprise_services_icon.png",
            bg: "enterprise_services.png"
        },
        "Facilities": {
            icon: "facilities_icon.png",
            bg: "facilities_bg.png"
        },
        "Generic Services": {
            icon: "generic_services_icon.png",
            bg: "generic_services_bg.png"
        },
        "HR": {
            icon: "HR_icon.png",
            bg: "HR_bg.png"
        },
        "Managed Print Service": {
            icon: "managed_print_service_icon.png",
            bg: "managed_print_service_bg.png"
        },
        "Messaging and Collaboration": {
            icon: "messaging_collaboration_icon.png",
            bg: "messaging_collaboration_bg.png"
        },
        "Middleware": {
            icon: "middleware_icon.png",
            bg: "middleware_bg.png"
        },
        "Network Services": {
            icon: "network_services_icon.png",
            bg: "network_services_bg.png"
        },
        "Security": {
            icon: "security_icon.png",
            bg: "security_bg.png"
        },
        "Servers Management": {
            icon: "servers_management_icon.png",
            bg: "servers_management_bg.png"
        },
        "Storage Services": {
            icon: "storage_services_icon.png",
            bg: "storage_services_bg.png"
        },
        "Telecom Services": {
            icon: "telecom_services_icon.png",
            bg: "telecom_services_bg.png"
        },
        "Workplace": {
            icon: "workplace_icon.png",
            bg: "workplace_bg.png"
        }
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    // Logic to run when the screen unloads goes here.
  }

  onDataLoad(data: any): void {
    // Logic to run when the screen's data is updated goes here.
  }
  onBackButton(): boolean {
    //(Android) returns :
    // true - handle the event in App Hooks
    // false - stop the event propogation
      return true;
  }

  // Handle displaying file after file is ready.
  onReady() {
    // Read file, and convert to base64 data
    // See: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    let reader = new FileReader();
    console.log(this.data.file)
    reader.readAsDataURL(this.data.file);
    reader.onload = () => {
      // Set fileData, which is used in the image
      this.data.fileData = reader.result;
    }
  }
}
