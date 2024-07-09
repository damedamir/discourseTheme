import Component from "@glimmer/component";

export default class CustomBannersComponent extends Component {
  get categoryBanners() {
    return settings.category_banners;
  }
}