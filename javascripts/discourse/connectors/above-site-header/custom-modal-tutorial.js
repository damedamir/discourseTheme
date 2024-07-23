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
        return this?.currentUser?.admin;
    }
    constructor(){
        super(...arguments);
        console.log(this.currentUser.previousVisitAt.getYear());
    }
}