import { FlexPlugin } from "flex-plugin";
import React from "react";
import FeatherTheme from "./FeatherCorpTheme";
import QuoteComponent from "./components/Quote/Quote";

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
    //added div if worker is unavailable
    flex.NoTasksCanvas.Content.add(
      <div style={{ color: "red", padding: 20 }} key='warning'>
        You are not available to receive tasks!
      </div>,
      {
        if: (props) => props.worker.activity.available === false,
      }
    );

    /* 
      alterando strings padrão do Twilio, para listar as strings atuais, acesse o localhost:3000, abra o console e digite Twilio.Flex.Manager.getInstance().strings
    */
    manager.strings.TaskHeaderLine = "Task 1st line";
    manager.strings.TaskLineCallReserved = "Call 2nd line";
    manager.strings.TaskLineSmsReserved = "SMS 2nd line";
    manager.strings.TaskLineChatReserved = "Chat 2nd line";

    //add the crm on the CRMContainer
    const crmUrl = "https://duckycrm-7409-dev.twil.io";
    flex.CRMContainer.defaultProps.uriCallback = (task) => {
      if (task) {
        return `${crmUrl}/profile?id=` + task.attributes.account_number;
      } else {
        return `${crmUrl}/index`;
      }
    };

    //set logo
    flex.MainHeader.defaultProps.logoUrl =
      "https://tangerine-toad-5117.twil.io/assets/feathercorp-logo-white.svg";

    //set color theme
    manager.updateConfig({ colorTheme: FeatherTheme });

    //remove default components
    flex.NoTasksCanvas.Content.remove("first-line");
    flex.NoTasksCanvas.Content.remove("second-line");
    flex.NoTasksCanvas.Content.remove("hint");

    //add our quote component
    flex.NoTasksCanvas.Content.add(<QuoteComponent key='qotd' />, {
      sortOrder: -1,
    });
  }
}
