import Component from "@glimmer/component";
import { service } from "@ember/service";

export default class CustomBannersComponent extends Component {
    @service currentUser;
    
    get currentUserGroups(){
       console.log(this.args); 
       return  this.currentUser?.groups.map( i => i.id);
    }

    get categoryBanners() {
        return settings.category_banners;
    }
}