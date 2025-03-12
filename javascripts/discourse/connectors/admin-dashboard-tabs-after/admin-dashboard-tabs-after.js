import Component from "@glimmer/component";
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

import {ajax} from "discourse/lib/ajax";

export default class AdminExtraTabLinks extends Component {
    @service currentUser;
    @service siteSettings;
    @service router;


    @tracked subcategories_with_positions = null;
    @tracked categories_fetched = false;

    constructor() {
        super(...arguments);   
        
      }
    
    @action
    navigateToBannerConfiguration(){
      this.router.transitionTo("/admin/customize/themes/10/schema/category_banners");
    }
    @action
    navigateToTopicThumbnails(){
      this.router.transitionTo("/admin/customize/components/18");
    }

    @action
    navigateToUserActivityExport(){
      this.router.transitionTo("/admin/plugins/explorer/queries/3");
    }

    
   
}