({
    upload: function(component, title, file, base64Data) {
        var self = this;
        if (title == null) title = '';
        
        var action = component.get("c.saveAttachment"); 
        action.setParams({
            parentId: component.get("v.recordId"),
            title: title,
            base64Data: base64Data, 
            contentType: file.type
        });
        action.setCallback(this, function(a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                component.set('v.fileData', null);
                $A.get('e.force:refreshView').fire();
            } else {
                self.handleErrors(component, a.getError());
            }
            self.hideSpinner(component);
            
        });
        $A.enqueueAction(action); 
    },
    handleErrors: function (component, errors) {
        // Configure error toast
        let toastParams = {
            title: "Error!",
            message: "Unknown error", // Default error message
            type: "error",
            mode: "sticky"
        };
        // Pass the error message if any
        if (errors && Array.isArray(errors) && errors.length > 0) {
            toastParams.message = errors[0].message;
        }
        else
        {
            toastParams.message = errors;
        }
        // Fire error toast
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams(toastParams);
        toastEvent.fire();
        
    },
    showSpinner:function(component){
        component.set("v.IsSpinner",true);
    },
    hideSpinner:function(component){
        component.set("v.IsSpinner",false);
    },
    getBase64 : function(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
            console.log('result=' + reader.result);
            let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
            if ((encoded.length % 4) > 0) 
            {
              encoded += '='.repeat(4 - (encoded.length % 4));
            }
            resolve(encoded);
        };
        reader.onerror = error => reject(error);
      });
    }   

})