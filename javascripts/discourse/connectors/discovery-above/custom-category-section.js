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
        

        if(this.args.outletArgs?.category){

            fetch('/categories.json?include_subcategories=true', {
                headers : {
                    'Api-Key' : 'c8a73fd76bd70c08ee2b9184f6ed89a8e0daa3a4c9a867a75545d232272ed997',
                    'Api-Username' : 'System'
                }
            }).then(res => res.json())
                .then(data => {  this.subcategories_with_positions = data?.category_list?.categories; this.categories_fetched=true;})
                    .catch(e => { this.categories_fetched=false;});
        }
      }

    
    get currentUserGroups(){
       return  this.currentUser?.groups.map( i => i.id);
    }

    get isAllAccessMember(){
        return this.currentUser?.groups.any(i => i.name === "VIP003-members");
    }

    get decorativeBannersAbove(){
        const category = this.getCategory;
        const banners = this.allCustomBanners.filter(banner =>  
            banner.group.includes(category?.id) 
            && !banner.banner_replaces_subcategory
            && (!banner.hasOwnProperty('decorative_banner_location') || banner.decorative_banner_location === 'ac' )
            );
        return banners.map(banner => {
            this.isAllAccessMember ? banner.has_access = true : banner.has_access = false;
            return banner;
        } );
    }

    get decorativeBannersBelow(){
        const category = this.getCategory;
        return this.allCustomBanners.filter(banner =>  
            banner.group.includes(category?.id) 
            && !banner.banner_replaces_subcategory
            &&  banner.decorative_banner_location === 'bc' 
            );
    }

    get getCategory(){
        return this.args.outletArgs?.category
    }

    get allCustomBanners(){
        return settings.category_banners;
    }

    get getSubcategories(){
        if(this.categories_fetched){
            return this.subcategories_with_positions
            ?.find(subcat => subcat.id === this.getCategory.id)?.subcategory_list;
        }
        return [];
    }

    get getSubategoryPositions(){
        const currentCategoryId = this.getCategory?.id;

        if(this.categories_fetched){
            return this.subcategories_with_positions.find(category => category.id == currentCategoryId)
                                                ?.subcategory_list?.reduce( (acc,item)  => {  
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
            const placeholder = placeholders.find(placehoder => placehoder?.subcategory_to_replace?.includes(item.id))
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
                has_access: true,
                url: subCat.path,
                full_name: subCat.name,
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
       
            mockSubgroupBanners = mockSubgroupBanners.map(banner => {
            if(positions[banner?.subcategory_to_replace[0]]){
                banner.position = positions[banner?.subcategory_to_replace].position;
            }
            banner["full_name"] = this.getSubcategories?.find(subcat => banner?.subcategory_to_replace[0] === subcat.id)?.name;
            banner.has_access = false;

            return {
                use_overlay: banner.use_overlay,
                has_access: banner.has_access,
                url: banner.url,
                full_name: banner.full_name,
                overlay_text : banner.overlay_text,
                overlay_button_text : banner.overlay_button_text,
                position : banner.position,
                image_url : banner.image_url
            };
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