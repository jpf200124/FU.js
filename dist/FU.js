// FU.js r1 - FU.js
(function(b,j){function g(a){var b="";switch(a.code){case FileError.QUOTA_EXCEEDED_ERR:b="QUOTA_EXCEEDED_ERR";break;case FileError.NOT_FOUND_ERR:b="NOT_FOUND_ERR";break;case FileError.SECURITY_ERR:b="SECURITY_ERR";break;case FileError.INVALID_MODIFICATION_ERR:b="INVALID_MODIFICATION_ERR";break;case FileError.INVALID_STATE_ERR:b="INVALID_STATE_ERR";break;default:b="Unknown Error"}console.log("Error: "+b)}function t(a){console.log("File Loaded: "+a)}function m(a){console.log("File Saved To Local FileSystem: "+
a)}function u(){console.log("There was an error reading the file")}function v(){}function w(){}function n(){console.log("There was an error writing the file")}function o(){console.log("File Save Progress Update!!")}function x(){console.log("File Write Cancelled by User")}b.LOAD_MECHANISM={FILE:"file",FILESYSTEM:"filesystem",XHR:"xhr",WEBWORKER:"webworker"};b.FILE_TYPE={TXT:"txt",BINARY:"binary"};b.CLIENT_FEATURES={Workers:!1,FilesystemAPI:!1,FileAPI:!1,XHR:!1};if(window.Worker)b.CLIENT_FEATURES.Workers=
!0;if(window.File&&window.FileReader&&window.FileList&&window.Blob)b.CLIENT_FEATURES.FileAPI=!0;if((window.requestFileSystem||window.webkitRequestFileSystem)&&(window.BlobBuilder||window.WebKitBlobBuilder))window.requestFileSystem=window.requestFileSystem||window.webkitRequestFileSystem,b.CLIENT_FEATURES.FilesystemAPI=!0,window.BlobBuilder=window.WebKitBlobBuilder;if(window.XMLHttpRequest)b.CLIENT_FEATURES.XHR=!0;b.FileSystem=j;b.TempFileSystem=j;b.LocalRoot=j;b.PersistantSize=1E7;b.TemporarySize=
1E7;b.InitLocalFileSystem=function(a){function f(c){b.FileSystem=c;b.CreateDirectory("",!1,a)}function d(a){b.TempFileSystem=a;b.CreateDirectory("",!0,function(){})}window.webkitStorageInfo.requestQuota(PERSISTENT,b.PersistantSize,function(a){window.requestFileSystem(PERSISTENT,a,f,g)},function(a){console.log("Error",a)});window.webkitStorageInfo.requestQuota(window.TEMPORARY,b.TemporarySize,function(a){window.requestFileSystem(window.TEMPORARY,a,d,g)},function(a){console.log("Error",a)})};b.LoadFile=
function(a){function f(){if(!a.remoteURL)throw Error("Cannot load a remote file without a remote URL");var c=new XMLHttpRequest;c.onreadystatechange=function(){if(this.readyState==4&&this.status==200){var a;if(i===b.FILE_TYPE.BINARY){var c=this.response;c&&(a=c)}else if(this.responseText!=null)a=this.responseText;l(a)}};c.open("GET",p,!0);if(i===b.FILE_TYPE.BINARY)c.responseType="arraybuffer";c.send(null)}function d(){if(!a.file)throw Error("Cannot Load File. File parameter is not specified.");var c=
new FileReader;c.onerror=m;c.onprogress=n;c.onabort=o;c.onloadend=function(a){l(a.target.result,h.name)};a.sliceParams!==j&&(h=h.webkitSlice(a.sliceParams.startIndex,a.sliceParams.stopIndex));i===b.FILE_TYPE.TXT?c.readAsText(h):c.readAsBinaryString(h)}function c(){if(!a.file&&!a.localURL&&!a.fileName)throw Error("Cannot Load File. The correct parameters are not specified.");var c;c=q?b.TempFileSystem:b.FileSystem;if(a.file)c.root.getFile(h.fullPath,{},function(a){a.file(function(a){h=a;d()},g)},g);
else if(a.localURL){var i=b.LocalRoot.concat("/"+r);c.root.getFile(i,{},function(a){a.file(function(a){h=a;d()},g)},g)}else a.fileName&&b.GetFileFromFilename(s,q,function(a){l(a,a.name)})}function k(){if(!a.remoteURL)throw Error("Cannot Load File via WebWorker. Remote URL is required.");worker=new Worker(p);worker.onmessage=function(a){l(a.data)};worker.postMessage((new Date).getTime())}var i,e,p,r,s,h,q,l=a.loaded?a.loaded:t,m=a.onerror?a.onerror:u,n=a.onprogress?a.onprogress:v,o=a.onabort?a.onabort:
w;if(!a.fileType||!a.loadMechanism)throw Error("Cannot Load File. Filetype and loadmechanism are required parameters");else i=a.fileType,e=a.loadMechanism,q=a.temporary,p=a.remoteURL,r=a.localURL,s=a.fileName,h=a.file;switch(e){case b.LOAD_MECHANISM.FILE:d();break;case b.LOAD_MECHANISM.FILESYSTEM:c();break;case b.LOAD_MECHANISM.XHR:f();break;case b.LOAD_MECHANISM.WEBWORKER:k()}};b.SaveFile=function(a){function f(a){(k?b.TempFileSystem:b.FileSystem).root.getFile(a,{create:!0},function(a){a.createWriter(function(b){var c=
new BlobBuilder;c.append(d);b.write(c.getBlob("application/octet-stream"));b.onerror=this.onerror||n;b.onprogress=this.onprogress||o;b.onabort=this.onabort||x;b.onwriteend=function(){var b=a.toURL();i(b)}},g)},g)}var d,c,k=!1;if(a.remoteAsset===j)throw Error("Cannot Save File: "+a.filePath+" Parameters are not defined!");else d=a.remoteAsset,c=a.filePath,k=a.temporary;var i=a.saved?a.saved:m,a="/"+b.LocalRoot+c;if(k){var e;encodeURIComponent(d).match(/%[89ABab]/g);e=UUID.generate();c=parseUri(c);
c=a.concat(c.directory,"/",e,"/",c.file);f(c)}else f(a)};b.CheckFileSystemForFile=function(a,f,d){a=b.LocalRoot.concat("/"+a);(f?b.TempFileSystem:b.FileSystem).root.getFile(a,{create:!1},function(a){d(a)},function(){d(j)})};b.CreateDirectory=function(a,f,d){a="/"+b.LocalRoot.concat("/"+a);(f?b.TempFileSystem:b.FileSystem).root.getDirectory(a,{create:!0},function(){d()},g)};b.GetFileFromFilename=function(a,f,d){var c=function(b){b.createReader().readEntries(function(b){for(var b=Array.prototype.slice.call(b||
[],0),e=0;e<b.length;e++)!b[e].isDirectory&&b[e].name===a?d(b[e]):b[e].isDirectory&&c(b[e])},g)};c((f?b.TempFileSystem:b.FileSystem).root)}})(window.FU=window.FU||{});