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
        if(this.currentUser.groups.find(g => g.name == "VIP003-members")){
            const categoriesContainer = document.getElementById('sidebar-section-content-categories');
            if(categoriesContainer){
                const parser = new DOMParser()
                const newMicroTacticsNode = parser.parseFromString(
                    `
                <li class="sidebar-section-link-wrapper" >
          <a  class="ember-view sidebar-section-link sidebar-row" target="_blank" href="https://www.hiveologie.com/resh/a/en/category/post/287">
            
      <span style="color: #4690df" class="sidebar-section-link-prefix span">
          <span style="background: linear-gradient(90deg, #4690df 50%, #4690df 50%)" class="prefix-span"></span>
        
         
      </span>
  

            <span class="sidebar-section-link-content-text">
              Micro Tactics
              <!---->
            </span>

<!---->
<!---->
<!---->          </a>
      </li>
                `, 'text/html'
                )
               const newResourcesNode = parser.parseFromString(`
                <li class="sidebar-section-link-wrapper" >
          <a  class="ember-view sidebar-section-link sidebar-row" target="_blank" href="https://www.hiveologie.com/resh/a/en/subscription/resources/4849/all-access-pass">
            
      <span style="color: #31a300" class="sidebar-section-link-prefix span">
          <span style="background: linear-gradient(90deg, #31a300 50%, #31a300 50%)" class="prefix-span"></span>
        
         
      </span>
  

            <span class="sidebar-section-link-content-text">
              Replays <> Resources
              <!---->
            </span>

<!---->
<!---->
<!---->          </a>
      </li>
                `, 'text/html');
                categoriesContainer.appendChild(newMicroTacticsNode.body.firstChild);
                categoriesContainer.appendChild(newResourcesNode.body.firstChild);
            }
        }
      }

                        
    

   
}