import Component from "@glimmer/component";
import { service } from "@ember/service";
import {CustomModalTutorial} from "./custom-modal-tutorial";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class IntroModal extends Component {
    @service currentUser;
    @service modal;
    @service router;
    

    @tracked modalIsVisible = true;
    @tracked alreadyViewed = false;


    closeTutorialModal(){
        this.set(this.modalIsVisible,false);
        this.router.refresh();
    }

    get username(){
        return this?.currentUser?.username || "there";
    }
    get userIsNew(){
     /*   return this?.currentUser?.admin; */ 
        return (new Date().getFullYear() - this.currentUser.previousVisitAt.getFullYear() ) < 5 ;
    }
    constructor(){
        super(...arguments);
        
        console.log(this.currentUser.previousVisitAt);
    }
}