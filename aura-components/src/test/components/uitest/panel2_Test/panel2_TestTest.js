/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIOloNS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
({
    browsers: ["-IE7","-IE8", "-IPHONE", "-IPAD", "-ANDROID_PHONE", "-ANDROID_TABLET"],
    
    /**
     * Test to verify first inputElement is focused
     */
    testPanelFocusOnFirstInput: {
    	test: [function(cmp) {
    		this.createPanel(cmp);
        }, function(cmp) {
        	$A.test.addWaitForWithFailureMessage(true, function() {
                var activeElement = $A.test.getActiveElement();
                return $A.util.hasClass(activeElement, "inputPanelTypeClass");
            }, "First input element should be focused.");
        }]
    },
  
    /**
     * Test to verify firstElement is not focused when autoFocus is set to false
     */
    testPanelNotFocusedOnFirstInputWithAutoFocusOff: {
    	attributes : {"testAutoFocus" : false},
    	test: [function(cmp) {
    		this.createPanel(cmp);
    	}, function(cmp) {
    		$A.test.addWaitForWithFailureMessage("body", function() {
    			var activeElement = $A.test.getActiveElement();
    			return activeElement.tagName.toLowerCase();
    		}, "First input element should not be focused.");
    	}]
    },
  
    /**
     * Test close button is not displayed on modal
     */
    testCloseButtonHiddenOnModal: {
    	attributes : {"testShowCloseButton" : false},
    	test: [function(cmp) {
    		this.createPanel(cmp);
    	}, function(cmp) {
    		this.waitForModalOpen();
    	}, function(cmp) {
    		this.verifyElementWithClassPresent("closeBtn", false, "Close button present when it should not be");
    	}]
    },
    
    /**
     * Test close button is not displayed on panel
     */
    testCloseButtonHiddenOnPanelDialog: {
    	attributes : {"testPanelType" : "panel", "testShowCloseButton" : false},
    	test: [function(cmp) {
    		this.createPanel(cmp);
    	}, function(cmp) {
    		this.waitForPanelDialogOpen();
    	}, function(cmp) {
    		this.verifyElementWithClassPresent("closeBtn", false, "Close button present when it should not be");
    	}]
    },
    
    /**
     * Test panel dialog takes up full screen
     */
    testPanelDialogFullScreen: {
    	attributes : {"testPanelType" : "panel", "testFlavor" : "full-screen"},
    	test: [function(cmp) {
    		this.createPanel(cmp);
    	}, function(cmp) {
    		this.waitForPanelDialogOpen();
    	}, function(cmp) {
    		this.verifyElementWithClassPresent("uiPanel--full-screen", true, "Panel dialog should be full screen"); 
    	}]
    },
    
    /**
     * Test large modal type
     */
    _testModalLarge: {
    	attributes : {"testFlavor" : "large"},
    	test: [function(cmp) {
    		this.createPanel(cmp);
    	}, function(cmp) {
    		this.waitForPanelDialogOpen();
    	}, function(cmp) {
    		this.verifyElementWithClassPresent("uiModal--large", true, "Modal should be of type large"); 
    	}]
    },
    
    /**
     * Test open multiple panel modals
     */
    testOpenMultipleModals: {
    	test: [function(cmp) {
    		this.createPanel(cmp);
    	}, function(cmp) {
    		this.waitForModalOpen();
    	}, function(cmp) {
    		var testerCmp = this.getPanelTesterComponent(cmp.find("tester"))
    		testerCmp.find("createPanelBtn").get("e.press").fire();
    	}, function(cmp) {
    		this.waitForNumberOfPanels("modal", 2);
    	}]
    },
    
    /**
     * Test close modal with multiple modals closes top most modal
     */
    testCloseModalWithMulitpleModals: {
    	test: [function(cmp) {
    		this.createPanel(cmp);
    	}, function(cmp) {
    		this.waitForModalOpen();
    	}, function(cmp) {
    		// second modal
    		var panelTesterCmp = this.getPanelTesterComponent(cmp.find("tester"))
    		panelTesterCmp.find("createPanelBtn").get("e.press").fire();
    	}, function(cmp) {
    		this.waitForNumberOfPanels("modal", 2);
    	}, function(cmp) {
    		this.closePanel(cmp);
    	}, function(cmp) {
    		this.waitForNumberOfPanels("modal", 1);
    	}]
    },
    
    /**
     * Test title hidden
     */
    testTitleHidden: {
    	attributes : {"testDisplayTitle" : false},
    	test: [function(cmp) {
    		this.createPanel(cmp);
    	}, function(cmp) {
    		this.waitForModalOpen();
    	}, function(cmp) {
    		var header = cmp.find("tester")._panel.getElement().getElementsByTagName("h2")[0];
    		$A.test.assertFalse($A.util.hasClass(header, "title"), "Title shold be hidden");
    	}]
    },
    
    /**
     * Test modal panel invisible
     */
    testModalHidden: {
    	attributes : {"testIsVisible" : false},
    	test: [function(cmp) {
    		this.createPanel(cmp);
    	}, function(cmp) {
    		this.waitForModalOpen();
    	}, function(cmp) {
    		var modal = $A.test.getElementByClass("uiModal");
    		$A.test.assertFalse($A.util.hasClass(modal, "active"), "Modal panel shold be hidden");
    	}]
    },
    
    /**
     * Test panel dialog invisible
     */
    testPanelDialogHidden: {
    	attributes : {"testPanelType" : "panel", "testIsVisible" : false},
    	test: [function(cmp) {
    		this.createPanel(cmp);
    	}, function(cmp) {
    		this.waitForPanelDialogOpen();
    	}, function(cmp) {
    		var panel = $A.test.getElementByClass("uiPanel");
    		$A.test.assertFalse($A.util.hasClass(panel, "active"), "Panel dialog shold be hidden");
    	}]
    },
    
    /**
     * Test custom header in Modal
     */
    testCustomHeaderInModal: {
    	attributes : {"testUseHeader" : true},
    	test: [function(cmp) {
    		this.createPanel(cmp);
    	}, function(cmp) {
    		this.waitForModalOpen();
    	}, function(cmp) {
    		this.verifyElementWithClassPresent("defaultCustomPanelHeader", true, 
    				"Custom panel header for modal should be present");
    	}]
    },
    
    /**
     * Test custom footer in Modal
     */
    testCustomFooterInModal: {
    	attributes : {"testUseFooter" : true},
    	test: [function(cmp) {
    		this.createPanel(cmp);
    	}, function(cmp) {
    		this.waitForModalOpen();
    	}, function(cmp) {
    		this.verifyElementWithClassPresent("defaultCustomPanelFooter", true, 
    				"Custom panel footer for modal should be present");
    	}]
    },
    
    /**
     * Test custom header in Panel Dialog
     */
    testCustomHeaderInPanelDialog: {
    	attributes : {"testPanelType" : "panel", "testUseHeader" : true},
    	test: [function(cmp) {
    		this.createPanel(cmp);
    	}, function(cmp) {
    		this.waitForPanelDialogOpen();
    	}, function(cmp) {
    		this.verifyElementWithClassPresent("defaultCustomPanelHeader", true, 
    				"Custom panel header for panel dialog should be present");
    	}]
    },
    
    /**
     * Test custom footer in Panel Dialog
     */
    testCustomFooterInPanelDialog: {
    	attributes : {"testPanelType" : "panel", "testUseFooter" : true},
    	test: [function(cmp) {
    		this.createPanel(cmp);
    	}, function(cmp) {
    		this.waitForPanelDialogOpen();
    	}, function(cmp) {
    		this.verifyElementWithClassPresent("defaultCustomPanelFooter", true, 
    				"Custom panel footer for panel dialog should be present");
    	}]
    },
    
    /**
     * Test close modal
     */
    testCloseModal: {
    	test: [function(cmp) {
    		this.createPanel(cmp);
    	}, function(cmp) {
    		this.waitForModalOpen();
    	}, function(cmp) {
    		this.closePanel(cmp);
    	}, function(cmp) {
    		this.waitForModalClose();
    	}]
    },
    
    /**
     * Test close panel dialog
     */
    testClosePanelDialog: {
    	attributes : {"testPanelType" : "panel"},
    	test: [function(cmp) {
    		this.createPanel(cmp);
    	}, function(cmp) {
    		this.waitForPanelDialogOpen();
    	}, function(cmp) {
    		this.closePanel(cmp);
    	}, function(cmp) {
    		this.waitForPanelDialogClose();
    	}]
    },
    
    verifyElementWithClassPresent : function(className, isPresent, errorMsg) {
    	var element = $A.test.getElementByClass(className);
    	var result = !$A.util.isUndefinedOrNull(element);
    	if (isPresent) {
    		$A.test.assertTrue(result, errorMsg);
    	} else {
    		$A.test.assertFalse(result, errorMsg);
    	}
    },
    
    getPanelTesterComponent : function(cmp) {
    	var panelRef = cmp._panel;
    	var panelBodyElem = panelRef.find("body").getElement();
    	var testerHtmlCmp = $A.componentService.getRenderingComponentForElement(panelBodyElem.lastChild);
    	return testerHtmlCmp.getAttributeValueProvider();
    },
    
    createPanel : function(cmp) {
    	cmp.find("tester").find("createPanelBtn").get("e.press").fire();
    },
    
    closePanel : function(cmp) {
    	var closeBtn = $A.test.getElementByClass("closeBtn")[0];
    	$A.test.clickOrTouch(closeBtn);
    },
    
    waitForPanelDialogOpen : function() {
    	this.waitForPanel("panel", true);
    },
    
    waitForPanelDialogClose : function() {
    	this.waitForPanel("panel", false);
    },
    
    waitForModalOpen : function() {
    	this.waitForPanel("modal", true);
    },
    
    waitForModalClose : function() {
    	this.waitForPanel("modal", false);
    },
    
    waitForNumberOfPanels : function(panelType, numPanels) {
    	this.waitForPanel(panelType, null, numPanels)
    },
    
    waitForPanel : function(type, isOpen, numItems) {
    	var panelType = type === "modal" ? "uiModal" : "uiPanel";
    	var expectedState = isOpen ? "open" : "closed";
    	
    	if (numItems) {
    		$A.test.addWaitForWithFailureMessage(numItems, function() {
				var panel = $A.test.getElementByClass(panelType);
				return $A.util.isUndefinedOrNull(panel) ? 0 : panel.length;
			}, "Number of panels expected is incorrect");
    	} else {
	    	$A.test.addWaitForWithFailureMessage(isOpen, function() {
				var panel = $A.test.getElementByClass(panelType);
				return !$A.util.isUndefinedOrNull(panel);
			}, "Panel was not " + expectedState);
    	}
    },
})
