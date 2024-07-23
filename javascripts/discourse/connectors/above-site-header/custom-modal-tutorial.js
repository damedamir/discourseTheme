import Component from "@glimmer/component";
import { service } from "@ember/service";
import {CustomModalTutorial} from "./custom-modal-tutorial";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class IntroModal extends Component {
    @service currentUser;
    @service modal;
    @service router;
    @service store;
    

    @tracked modalIsVisible = true;
    @tracked alreadyViewed = false;

    @action
    async closeTutorialModal(){
        this.modalIsVisible = !this.modalIsVisible;
        let refreshing  = await this.router.refresh();
        console.log(refreshing);
        this.store.findRecord('user', 1, { reload: true }).then(e => {console.log(e)});
        console.log(this.store);
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