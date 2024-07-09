import Component from "@glimmer/component";

export default class CustomBannersComponent extends Component {
  get categoryBanners() {
    return JSON.parse(settings.category_banners);
  }
}