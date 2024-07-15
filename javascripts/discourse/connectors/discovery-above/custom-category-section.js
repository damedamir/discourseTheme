import Component from "@glimmer/component";
import { service } from "@ember/service";

export default class CustomBannersComponent extends Component {
    @service currentUser;
    @service siteSettings;
    
    get currentUserGroups(){
       
       return  this.currentUser?.groups.map( i => i.id);
    }

    get templateUploads(){
        return settings.template_uploads;
    }

    get subcategoryBanners(){
        console.log("Logging subcategory");
        const category = this.args.outletArgs?.category;
        if(!category){
            return [];
        }

        const {subcategories} = category;


        
        if(!subcategories.length > 0){
            return [];
        }
        
        const bannerData = subcategories.map(subCat => {
            if(!subCat?.path){
                throw new Error("Discourse didn't return a subcategory path. Please contact website admin");
            }
            if(!subCat?.name){
                throw new Error("Discourse did't return a subcategory name. Please contact the website admin.")
            }
            
            return {
                path: subCat.path,
                name : subCat.name,
                position : subCat.position
            };
        });

        return bannerData;

    }

    get subcategoryPlaceholderBanners(){
        const category = this.args.outletArgs?.category;
        if(!category){
            return [];
        }
        if(category?.parent_category_id){
            return [];
        }
        const subcategories = category.subcategories;
        const subcategoryIds = subcategories.map(subCat => subCat.id);
        
        const allBanners = settings.category_banners;
        
        const mockSubgroupBanners = allBanners.filter( banner => {
            if(!banner.banner_replaces_subcategory){
                return false;
            }
            
            return (
                !subcategoryIds.includes(banner?.subcategory_to_replace[0]) &&
                banner.group.includes(category.id)
                 );
        } );
       /* if(subcategories.length > 0){
            return [];
        }
         */
        return mockSubgroupBanners;
    }
    
    get relevantCategoryBanners(){
        const category = this.args.outletArgs?.category;
        if(!category){
            return [];
        }

        const subcategories = category.subcategories;
        const subcategoryIds = subcategories.map(subCat => subCat.id);
        
        const userMemberships = this.currentUser?.groups.map( i => i.id);
        const allBanners = settings.category_banners;
        
    
       /* if(subcategories.length > 0){
            return [];
        }
         */
      
        const relevantBanners = allBanners.filter( 
            banner => (banner.group.includes(category.id) && !banner.banner_replaces_subcategory)
            );

        return relevantBanners;


    }

    get categoryBanners() {
        return settings.category_banners;
    }
}