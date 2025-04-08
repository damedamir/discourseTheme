import Component from "@glimmer/component";
import { service } from "@ember/service";

export default class CustomWelcomeBanner extends Component {
  @service currentUser;

  <template>
    <div class="custom-welcome-banner">
      {{#if this.currentUser}}
        Welcome back @{{this.currentUser.username}}.
      {{else}}
        Welcome to our community.
      {{/if}}
    </div>
  </template>
}