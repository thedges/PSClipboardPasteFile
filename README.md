# PSClipboardPasteFile
Component to capture clipboard images and save as attachments on current record. Use case is case worker that needs to capture screenshot and quickly paste as file on record. Currently only supports images but can consider adding other file types in future.

A title for the image can be provided when saving. If a title is not provided, a default value of "Image_yyyyMMdd_HHmmss" will be provided using Java Date/Time formatting as defined [here](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html).

![alt text](https://github.com/thedges/PSClipboardPasteFile/blob/master/PSClipboardPasteFile.gif "Demo")

Component has following configuration options:
   * <b>Height</b> - the default height of the component (provide integer value for pixel height)
   * <b>Compression Size</b> - the size of image to compress to (provide integer value for compression size in kilobyte). Currently using [this GitHub library](https://github.com/WangYuLue/image-conversion) to compress images to target kilobyte size.
   * <b>Message</b> - the message to show on main screen directly below image icon
   * <b>Save Button Text</b> - the text to show for the save button (this will save the clipboard image as content document)
   * <b>Clear Button Text</b> - the text to show for the clear button (to clear current clipboard selection)

<a href="https://githubsfdeploy.herokuapp.com">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>
