import Component from "@glimmer/component";
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

import {ajax} from "discourse/lib/ajax";

export default class AdminTopNoticesExtension extends Component {
    @service currentUser;
    @service siteSettings;
    @service router;

    @tracked subcategories_with_positions = null;
    @tracked categories_fetched = false;

    constructor() {
        super(...arguments);   
        console.log(this.args.outletArgs);
      }

   get isAdminPage(){
        console.log(this.args.outletArgs.currentPath.split('.'));
        return this.args.outletArgs.currentPath.split('.')[0] === 'admin';
   } 

   @action
   navigateToDashboard(){
    this.router.transitionTo("admin.dashboard.general");
   }


   
}