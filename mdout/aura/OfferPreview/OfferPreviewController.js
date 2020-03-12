
/*
* Copyright (c) 2018, salesforce.com, inc.
* All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
* For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
*/
({
	handleApplicationEvent : function(component, event, helper) {
        
        console.log("OfferPreviewController.handleApplicationEvent: entered");
        
        var params = event.getParams();
        
        component.set("v.templateVal", params.offerText);
        component.set("v.templateSubjectVal", params.offerSubject);
        component.set("v.email", params.email);
        component.set("v.offerId", params.offerId);
        
        
        component.set("v.showAttachmentLC", params.AttachAFile);

        console.log("text = " + component.get("v.templateVal"));
        console.log("subject = " + component.get("v.templateSubjectVal"));
        console.log("email = " + component.get("v.email"));
        console.log("offerId = " + component.get("v.offerId"));
        console.log("showAttachmentLC = " + component.get("v.showAttachmentLC"));

        

        console.log("OfferPreviewController.handleApplicationEvent: exit");
        
    },
    
    goBack : function(component, event, helper) {
        
        console.log("OfferPreviewController.goBack: entered");

        // Fire Component (Bubbling) event to ask the OfferLetterSPA LC (Parent) to go back to previous child LC:
        
        var cmpEvent = component.getEvent("bubblingEvent");
        console.log('cmpEvent: ' + cmpEvent);
        
        cmpEvent.setParams({"ComponentAction" : 'OfferPreview_Back' });

        cmpEvent.fire();
        
        
        //Pass the the latest Text and Subject values back to the last LC when going back:
        var appEvent = $A.get("e.c:CandidateDetailEvent");
        appEvent.setParams({ 
                            "offerText": component.get("v.templateVal"),
                            "offerSubject": component.get("v.templateSubjectVal")
                           });
        
        appEvent.fire();
        
        
        console.log("OfferPreviewController.goBack: exit");
    },
    
    goNext : function(component, event, helper) {
        
        console.log("OfferPreviewController.goNext: entered");

        // Fire Component (Bubbling) event to ask the OfferLetterSPA LC (Parent) to go back to next child LC:
        
        var cmpEvent = component.getEvent("bubblingEvent");
        console.log('cmpEvent: ' + cmpEvent);
        
        cmpEvent.setParams({"ComponentAction" : 'OfferPreview_Next' });

        cmpEvent.fire();
        
        
        //Pass the the latest Text and Subject values to the next LC:
        var appEvent = $A.get("e.c:CandidateDetailEvent");
        appEvent.setParams({ 
                            "offerText": component.get("v.templateVal"),
                            "offerSubject": component.get("v.templateSubjectVal"),
				            "offerId": component.get("v.offerId"),
				            "email": component.get("v.email"),
            				"LCWhoFired": 'OfferPreview.cmp'
                           });
        
        appEvent.fire();
        
        
        console.log("OfferPreviewController.goNext: exit");
    }
})