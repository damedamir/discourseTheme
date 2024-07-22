import Component from "@glimmer/component";
import { service } from "@ember/service";

export default class IntroModal extends Component {
    @service currentUser;
    @service modal;

    get userIsNew(){
        return this?.currentUser.isAdmin;
    }


}