import Component from "@glimmer/component";
import { service } from "@ember/service";
import {CustomModalTutorial} from "./custom-modal-tutorial";

export default class IntroModal extends Component {
    @service currentUser;
    @service modal;

    modalIsVisible = true;
    alreadyViewed = false;

    get username(){
        return this?.currentUser?.username || "there";
    }
    get userIsNew(){
     /*   return this?.currentUser?.admin; */ 
        return (new Date().getFullYear() - this.currentUser.previousVisitAt.getFullYear() ) < 5 ;
    }
    constructor(){
        super(...arguments);
        this.currentUser.previousVisitAt = new Date();
        console.log(this.currentUser.previousVisitAt);
    }
}