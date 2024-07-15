import Component from "@glimmer/component";
import { service } from "@ember/service";

import {ajax} from "discourse/lib/ajax";

export default class CustomBannersComponent extends Component {
    @service currentUser;
    @service siteSettings;
    
    get currentUserGroups(){
       
       return  this.currentUser?.groups.map( i => i.id);
    }

    get templateUploads(){
        return settings.template_uploads;
    }

    get getCategory(){
        return this.args.outletArgs?.category
    }

    get getSubategoryPositions(){
        const currentCategoryId = this.getCategory.id;
        const allCategories = fetch('/categories.json?include_subcategories=true', {
            headers :{
                'Api-Key' : 'c8a73fd76bd70c08ee2b9184f6ed89a8e0daa3a4c9a867a75545d232272ed997',
                'Api-Username' : 'System'
            }
        }
        ).then(r => r.json()).then(e => e?.category_list?.categories);
        console.log(allCategories)

        return allCategories._result.find(cat => cat.id == currentCategoryId)
                            ?.subcategory_list.map( subCat => ({
                                id : subCat.id,
                                position : subCat.position
                            })).sort((a,b) => {a.position > b.position } );
                            
    }

    get subcategoryBanners(){
        const category = this.getCategory;
        if(!category){
            return [];
        }


        const placeholders = this.allCustomBanners;
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

    get orderedSubcategoryBanners(){
       const orderedBanners =  [
        ...this.subcategoryBanners,
        ...this.subcategoryPlaceholderBanners
    ];

       
       console.log("logging ordered banners");
       console.log(this.getSubategoryPositions);
       return orderedBanners;
    }

    get allCustomBanners(){
        return settings.category_banners;
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
        
        const allBanners = this.allCustomBanners ;
        
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