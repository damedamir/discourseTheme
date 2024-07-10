import Component from "@glimmer/component";
import { service } from "@ember/service";

export default class CustomBannersComponent extends Component {
    @service currentUser;
    @service siteSettings;


    static shouldRender(outletArgs, helper){
        return outletArgs.category;
    }
    
    
    

  
    get accessResourcesButton(){
        const allResourceButtons = settings.all_resources_access;
        const user = this.currentUser;

        const currentCategoryId = this.args.outletArgs.category.id;

        const buttonData = allResourceButtons.filter(button => button.category.includes(currentCategoryId));
        
        return buttonData || false;

    }

   
}