import Component from "@glimmer/component";
import { service } from "@ember/service";

export default class CustomBannersComponent extends Component {
    @service currentUser;
  
    get categoryBanners() {
        return settings.category_banners;
    }
}