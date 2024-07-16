import Component from "@glimmer/component";
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

import {ajax} from "discourse/lib/ajax";

export default class CustomBannersComponent extends Component {
    @service currentUser;
    @service siteSettings;

    @tracked subcategories_with_positions = null;
    @tracked categories_fetched = false;

    constructor() {
        super(...arguments);
    
        fetch('/categories.json?include_subcategories=true', {
            headers : {
                'Api-Key' : 'c8a73fd76bd70c08ee2b9184f6ed89a8e0daa3a4c9a867a75545d232272ed997',
                'Api-Username' : 'System'
            }
        }).then(res => res.json())
            .then(data => {  this.subcategories_with_positions = data?.category_list?.categories; this.categories_fetched=true;})
                .catch(e => {console.log(e); this.categories_fetched=false;});
      }

    
    get currentUserGroups(){
       
       return  this.currentUser?.groups.map( i => i.id);
    }

    get templateUploads(){
        return settings.template_uploads;
    }

    get decorativeBanners(){
        const category = this.getCategory;
        return this.allCustomBanners.filter(banner =>  banner.group.includes(category?.id) && !banner.banner_replaces_subcategory   );
    }

    get getCategory(){
        return this.args.outletArgs?.category
    }

    get getSubategoryPositions(){
        const currentCategoryId = this.getCategory?.id;

        if(this.categories_fetched){
            return this.subcategories_with_positions.find(category => category.id == currentCategoryId)
                                                ?.subcategory_list.reduce( (acc,item)  => {  
                                                    if(!acc[item.id]){
                                                        acc[item.id] = {
                                                            position: item.position
                                                        }
                                                    }  
                                                    return acc;
                                                }, {});                                  

        }else{
            return {};
        }
                            
    }

    get subcategoryBanners(){
        const category = this.getCategory;
        if(!category){
            return [];
        }

        let cat = null;
        const placeholders = this.allCustomBanners;
        let {subcategories} = category;

        subcategories = subcategories.map(item => {
            const placeholder = placeholders.find(placehoder => placehoder?.subcategory_to_replace.includes(item.id))
            if(placeholder){
                item.image_url = placeholder.image_url;
            }
            return item;
        })

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
                use_overlay: true,
                url: subCat.path,
                overlay_text : subCat.name,
                position : subCat.position,
                image_url : subCat.image_url
            };
        });

        return bannerData;

    }

    get orderedSubcategoryBanners(){
       const orderedBanners =  [
        ...this.subcategoryBanners,
        ...this.subcategoryPlaceholderBanners
    ].sort((a,b) => a.position - b.position);

       return orderedBanners;
    }

    get allCustomBanners(){
        return settings.category_banners;
    }

    get subcategoryPlaceholderBanners(){
        const category = this.args.outletArgs?.category;
        const positions = this.getSubategoryPositions;
        if(!category){
            return [];
        }
        if(category?.parent_category_id){
            return [];
        }
        const subcategories = category.subcategories;
        const subcategoryIds = subcategories.map(subCat => subCat.id);
       
 
        
        let mockSubgroupBanners = this.allCustomBanners.filter( banner => {
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
            
            mockSubgroupBanners = mockSubgroupBanners.map(banner => {
            if(positions[banner?.subcategory_to_replace[0]]){
                banner.position = positions[banner?.subcategory_to_replace].position;
            }
            return banner;
        });
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