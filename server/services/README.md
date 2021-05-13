# Services Directory

This folder contains all connections and sdk developments for external tools and libraries needed by the application. For example, payment handling, email sending, location tracking, etc. Each service encapsulates all service logic, which is independent to business logic, so it can be used in multiple controllers.

In some cases, having completely independent service logic is not possible, thus some services may have methods specific for a controller or a set of controllers. 

E.g. file storage specific to pdfs sent on a registration form would have a specific service method than the general `storeFile` method if there is some extra processing needed to extract information from the pdf.