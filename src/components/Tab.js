import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './componentStyle/tab-style.css';

export default function Blaah(props) {

    return (    
        <Tabs>
          <TabList>
            <Tab><div className="issuestab bottomtab"></div>Issues {props.renderIssueList.length}</Tab>            
            <Tab><div className="codetab bottomtab"></div>Code</Tab>
          </TabList>
                    <TabPanel><div className="issue-tab" >
                      {props.renderIssueList} 
                      
                      </div>

            <TabPanel> Code</TabPanel>    
            </TabPanel>
        </Tabs>
    )
}
