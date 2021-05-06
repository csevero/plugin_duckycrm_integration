import { FlexPlugin } from "flex-plugin";
import React from "react";
import FeatherTheme from "./FeatherCorpTheme";

const PLUGIN_NAME = "FirstPlugin";

export default class FirstPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    flex.NoTasksCanvas.Content.add(
      <div style={{ color: "red", padding: 20 }} key='warning'>
        You are not available to receive tasks!
      </div>,
      {
        if: (props) => props.worker.activity.available === false,
      }
    );

    flex.MainHeader.defaultProps.logoUrl =
      "https://tangerine-toad-5117.twil.io/assets/feathercorp-logo-white.svg";

    manager.updateConfig({ colorTheme: FeatherTheme });
  }
}
