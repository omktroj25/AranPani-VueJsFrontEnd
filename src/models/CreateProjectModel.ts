let statusType: 'Proposed' | 'Planned' | 'Active' | 'Completed' | 'Scrapped';
export interface CreateProjectModel {
    incharge_mobile_number: string;
    incharge_name: string;
    lat: number;
    location: string;
    location_name_tamil: string;
    long: number;
    name: string;
    project_attachment_ids: any[]; 
    project_attachments: any[]; 
    project_blogs: any[]; 
    project_document_ids: any[]; 
    project_documents: any[];
    status: typeof statusType;
    temple_incharge_name_tamil: string;
    temple_name_tamil: string;
}
