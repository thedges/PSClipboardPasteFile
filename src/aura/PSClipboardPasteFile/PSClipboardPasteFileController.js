({
    init: function (component, event, helper) {
        var imageSize = component.get('v.imageSize');
        
        window.addEventListener (
            'paste',
            function (pasteEvent) {
                if(pasteEvent.clipboardData != false){
                    
                    var items = pasteEvent.clipboardData.items;
                    
                    if(items != undefined)
                    {
                        for (var i = 0; i < items.length; i++) {
                            // Skip content if not image
                            if (items[i].type.indexOf("image") == -1) continue;
                            // Retrieve image on clipboard as blob
                            var imageBlob = items[i].getAsFile();
                            
                            console.log('imageBlob size 1 = ' + imageBlob.size);
                            console.log('imageBlob type 1 = ' + imageBlob.type);
                            
                            imageConversion.compressAccurately(imageBlob, imageSize)
                            .then(function(res) {
                                console.log(res);
                                console.log('size = ' + res.size);
                                console.log('type = ' + res.type);
                                console.log('name = ' + res.name);
                                
                                component.set('v.fileData', res);
                                var myimg = document.getElementById ('myimg');
                                myimg.src = URL.createObjectURL (res);
                            }, function(err) {
                                helper.handleErrors(component, err);
                            });
                            
                        }
                    }
                }
            },
            false
        );
    },
    saveFile : function (component, event, helper) {
        var fileData = component.get('v.fileData');
        var title = component.get('v.title');
        var base64Data = null;
        
        helper.showSpinner(component);
        helper.getBase64(fileData).then(function(data) 
                                        {
                                            console.log('base64=' + data); 
                                            base64Data = data;
                                            helper.upload(component, title, fileData, base64Data);
                                            
                                            //$A.get('e.force:refreshView').fire();
                                        });
        
    },
    clear : function (component, event, helper) {
        component.set('v.fileData', null);
    }
})