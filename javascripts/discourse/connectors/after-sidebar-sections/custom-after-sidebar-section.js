import Component from "@glimmer/component";
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

import {ajax} from "discourse/lib/ajax";

class CustomSidebarSection extends Component {
    @service currentUser;
    @service siteSettings;


    constructor() {
        super(...arguments);
        
        console.log("logging from sidebar")
       console.log(this.currentUser)
      }


}