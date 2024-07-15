import Component from "@glimmer/component";
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

import {ajax} from "discourse/lib/ajax";

export default class CustomBannersComponent extends Component {
    @service currentUser;
    @service siteSettings;

    @tracked subcategories_with_positions = null;




    @action 
    getSubcategoriesPositionData(){
        try{
            fetch('/categories.json?include_subcategories=true', {
                headers : {
                    'Api-Key' : 'c8a73fd76bd70c08ee2b9184f6ed89a8e0daa3a4c9a867a75545d232272ed997',
                    'Api-Username' : 'System'
                }
            }).then( res => res.json()).then(data => { this.subcategories_with_positions = data.category_list;});
        }catch (error) {
            console.log('Failed:' , error);
        }

    }
    
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
        const currentCategoryId = this.getCategory?.id;
        let positionData =  fetch('/categories.json?include_subcategories=true', {
            headers : {
                'Api-Key' : 'c8a73fd76bd70c08ee2b9184f6ed89a8e0daa3a4c9a867a75545d232272ed997',
                'Api-Username' : 'System'
            }
        }).then( res => res.json()).then( data =>  data.category_list );

        return positionData;
       /*.then(r => r.json()).then(e => { return e?.category_list?.categories?.find(cat => cat.id == currentCategoryId)
            ?.subcategory_list.map( subCat => ({
                id : subCat.id,
                position : subCat.position
            })).sort((a,b) => {return a.position > b.position } )} );*/
        

       /* return allCategories.find(cat => cat.id == currentCategoryId)
                            ?.subcategory_list.map( subCat => ({
                                id : subCat.id,
                                position : subCat.position
                            })).sort((a,b) => {a.position > b.position } );*/
                            
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
        const positions = this.getSubategoryPositions.then(data =>  data.category_list.categories );
        console.log(positions);
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