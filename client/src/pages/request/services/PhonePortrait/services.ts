import { Component } from '@angular/core';
import { Screen } from 'app/screen';
declare var window: any;

@Component({
  selector: 'screen-request-services_phoneportrait',
  templateUrl: 'services.html'
})
export class request_services_PhonePortrait extends Screen {
    data: any;
    services: object;

  ngOnInit(): void {
    super.ngOnInit();
    // Logic to run when the screen loads goes here.

    this.data.services = {
        "AccessManagement": {
            icon: "access_management_icon.png",
            bg: "access_bg.png"
        },
        "CloudServices": {
            icon: "cloud_services_icon.png",
            bg: "cloud_services_bg.png"
        },
        "DatabaseServices": {
            icon: "database_services_icon.png",
            bg: "database_services_bg.png"
        },
        "EnablingIT": {
            icon: "enabling_IT_icon.png",
            bg: "enabling_IT_bg.png"
        },
        "EnterpriseServices": {
            icon: "enterprise_services_icon.png",
            bg: "enterprise_services.png"
        },
        "Facilities": {
            icon: "facilities_icon.png",
            bg: "facilities_bg.png"
        },
        "GenericServices": {
            icon: "generic_services_icon.png",
            bg: "generic_services_bg.png"
        },
        "HR": {
            icon: "HR_icon.png",
            bg: "HR_bg.png"
        },
        "ManagedPrintService": {
            icon: "managed_print_service_icon.png",
            bg: "managed_print_service_bg.png"
        },
        "MessagingandCollaboration": {
            icon: "messaging_collaboration_icon.png",
            bg: "messaging_collaboration_bg.png"
        },
        "Middleware": {
            icon: "middleware_icon.png",
            bg: "middleware_bg.png"
        },
        "NetworkServices": {
            icon: "network_services_icon.png",
            bg: "network_services_bg.png"
        },
        "Security": {
            icon: "security_icon.png",
            bg: "security_bg.png"
        },
        "ServersManagement": {
            icon: "servers_management_icon.png",
            bg: "servers_management_bg.png"
        },
        "StorageServices": {
            icon: "storage_services_icon.png",
            bg: "storage_services_bg.png"
        },
        "TelecomServices": {
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
      console.log(data);
  }
  onBackButton(): boolean {
    //(Android) returns :
    // true - handle the event in App Hooks
    // false - stop the event propogation
      return true;
  }
}
