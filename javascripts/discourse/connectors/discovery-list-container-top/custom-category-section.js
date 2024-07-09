import Component from "@glimmer/component";
import { service } from "@ember/service";

export default class CustomBannersComponent extends Component {
    @service currentUser;
    @service siteSettings;
    
    get currentUserGroups(){
       
       return  this.currentUser?.groups.map( i => i.id);
    }
    
    get relevantCategoryBanners(){
        const category = this.args.outletArgs.category;
        if(!category){
            return [];
        }
        const subcategories = category.subcategories;
        const userMemberships = this.currentUser?.groups.map( i => i.id);
        const allBanners = settings.category_banners;

        const relevantBanners = allBanners.filter( banner => banner.group.includes(category.id));

        return relevantBanners;


    }

    get categoryBanners() {
        return settings.category_banners;
    }
}