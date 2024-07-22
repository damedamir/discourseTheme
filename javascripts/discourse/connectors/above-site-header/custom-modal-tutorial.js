import Component from "@glimmer/component";
import { service } from "@ember/service";

export default class IntroModal extends Component {
    @service currentUser;

    get userIsNew(){
        return this?.currentUser.isNew;
    }


}