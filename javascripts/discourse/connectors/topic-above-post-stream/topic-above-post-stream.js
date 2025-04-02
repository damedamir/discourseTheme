import Component from "@glimmer/component";
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

import {ajax} from "discourse/lib/ajax";

export default class DirectLinRestriction extends Component {
    @service currentUser;
    @service siteSettings;
    @service router;

    constructor() {
        super(...arguments);   
        console.log("Above post stream Outlet Args");
        console.log(this.args.outletArgs);
        
        console.log("router instance from component");
        console.log(this.router);

        

        const { micro_tactic_restristions } = settings;
        console.log("restriction setting from component");
        console.log(micro_tactic_restristions);
        const restrictedTags = [];
        const allowedTags = [];
        const userGroups = this.currentUser.groups.map(group => group.id);
        micro_tactic_restristions.forEach(restriction => {
            if(!userGroups.includes(restriction.groups[0])){
              restriction.tags.forEach(tag => {
                restrictedTags.push(tag);
              });
            }else{
              restriction.tags.forEach(tag => {
                allowedTags.push(tag);
              });
            }
          });
        
          let difference = restrictedTags.filter(x => !allowedTags.includes(x));
          if(topic.tags.any(tag => difference.includes(tag))){
            return 'hidden-by-restriction';
          }
        /*console.log(settings.micro_tactic_restristions);*/
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