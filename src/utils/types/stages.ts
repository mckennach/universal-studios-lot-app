

interface Stages {

}



export interface Stage {
    id: string;
    area: string;
    cad: string | string[];
    details: string;
    height: string | number;
    length: string | number;
    page_id: string | number;
    pdf: string | string[];
    pits: string | number;
    point_load: string | number;
    silent_ac: string | number;
    stage_number: string;
    width: string | number;
    wifi: string | number;
}
