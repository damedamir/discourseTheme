import Component from "@glimmer/component";
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

import {ajax} from "discourse/lib/ajax";

export default class CustomBannersComponent extends Component {
    @service currentUser;
    @service siteSettings;

    constructor() {
        super(...arguments);
        

        console.log("logging from after sidebar");
        console.log(this.currentUser);
        if(this.currentUser.groups.find(g => g.name == "VIP003-members")){
            const categoriesContainer = document.getElementById('sidebar-section-content-categories');
            if(categoriesContainer){
                const parser = new DOMParser()
                newResourcesNode = parser.parseFromString(`
                <li class="sidebar-section-link-wrapper" >
          <a id="ember21" class="ember-view sidebar-section-link sidebar-row" target="_blank" href="https://www.hiveologie.com/resh/a/en/subscription/resources/4849/all-access-pass">
            
      <span style="color: #31a300" class="sidebar-section-link-prefix span">
          <span style="background: linear-gradient(90deg, #31a300 50%, #31a300 50%)" class="prefix-span"></span>
        
          <svg class="fa d-icon d-icon-lock svg-icon prefix-badge svg-string" xmlns="http://www.w3.org/2000/svg"><use href="#lock"></use></svg>
      </span>
  

            <span class="sidebar-section-link-content-text">
              Peak Performance
              <!---->
            </span>

<!---->
<!---->
<!---->          </a>
      </li>
                `, 'text/html');
                console.log(newResourcesNode);
            }
        }
      }

                        
    

   
}