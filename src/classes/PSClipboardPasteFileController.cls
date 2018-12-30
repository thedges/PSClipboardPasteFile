public class PSClipboardPasteFileController {
    @AuraEnabled
    public static Id saveAttachment(Id parentId, String title, String base64Data, String contentType) {
        System.debug('1'); 
        
        /*
        Attachment attachment = new Attachment();
        attachment.parentId = parentId;
        attachment.body = EncodingUtil.base64Decode(base64Data);
        attachment.name = fileName;
        attachment.contentType = contentType;
        insert attachment;
        
        return attachment.id;
        */

        if (title == null || title.length() == 0)
        {
          title = 'Image_' + Datetime.now().format('yyyyMMdd_HHmmss');    
        }
        
        ContentVersion conVer = new ContentVersion();
        conVer.ContentLocation = 'S';          // S specify this document is in SF, use E for external files
        conVer.PathOnClient = title + '.png';  // The files name, extension is very important here which will help the file in preview.
        conVer.Title = title;                  // Display name of the files
        conVer.VersionData = EncodingUtil.base64Decode(base64Data); 
        insert conVer;

        Id conDoc = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:conVer.Id].ContentDocumentId;

       //Create ContentDocumentLink
       ContentDocumentLink cDe = new ContentDocumentLink();
       cDe.ContentDocumentId = conDoc;
       cDe.LinkedEntityId = parentId;        // you can use objectId,GroupId etc
       cDe.ShareType = 'I';                 // Inferred permission, checkout description of ContentDocumentLink object for more details
       cDe.Visibility = 'InternalUsers';
       insert cDe;

       return cDe.Id;
    }
}