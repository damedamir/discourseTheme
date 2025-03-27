import Component from "@glimmer/component";
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

import {ajax} from "discourse/lib/ajax";

export default class HiddenMicroTactic extends Component {
    @service currentUser;
    @service siteSettings;
    @service router;

    constructor() {
        super(...arguments);   
        console.log(this.args.outletArgs);
        console.log(settings.micro_tactic_restristions);
      }

   get isAdminPage(){
        console.log(this.args.outletArgs.currentPath);
        return this.args.outletArgs.currentPath.split('.')[0] === 'admin' && !(this.args.outletArgs.currentPath.split('.')[1] === 'dashboard') ;
   } 

   @action
   navigateToDashboard(){
    this.router.transitionTo("admin.dashboard.general");
   }
}