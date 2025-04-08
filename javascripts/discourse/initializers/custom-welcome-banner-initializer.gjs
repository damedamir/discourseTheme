import { apiInitializer } from "discourse/lib/api";
import HiveTopicListThumbnail from "../components/hive-topic-thumbnail";

export default apiInitializer((api) => {
    const ttService = api.container.lookup("service:topic-thumbnails");
    api.renderInOutlet(
        "topic-list-before-link",
        <template>
          {{#if ttService.displayList}}
            <HiveTopicListThumbnail @topic={{@outletArgs.topic}} />
          {{/if}}
        </template>
      );
});

