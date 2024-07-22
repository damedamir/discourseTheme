import Component from "@glimmer/component";
import { service } from "@ember/service";
import {CustomModalTutorial} from "./custom-modal-tutorial";

export default class IntroModal extends Component {
    @service currentUser;
    @service modal;

    get userIsNew(){
        return this?.currentUser.admin;
    }
    constructor(){
        super(...arguments);
        
        this.modal.show(CustomModalTutorial);
        console.log(this.modal);
    }


}