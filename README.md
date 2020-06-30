# Ancora_Backend


## MVP
The MVP will be an index of the studies form Clinical Trials in an easily accessable format, so that people can quickly get a goot idea of the general landscape of current clinical research on whatever topic/disease they want. It will additionally serve as a way for them to search for studies that they can potentially volunteer for.

## Extra Stuff
Ideally I will also query for more info about the study and have detailed show pages for all the studies so that a use can get more info directly in the app. But for the MVP, I will instead link to Clinical Trials's show page for any particular study (as eas study has lots of complex information)


### The Data

- Main source will be https://clinicaltrials.gov/
- Info About The API https://clinicaltrials.gov/api/gui/ref/api_urls
- It is updateted daily and can be downloaded as XML @ `https://clinicaltrials.gov/AllPublicXML.zip`


##### Feilds
Based on the filter on Clinical Trials, these seem to be the data feilds for each study
- Status
    - Not Yet Recruiting
    - Recruiting
    - Enrolling By Invitation
    - Active, Not Recruiting
    - Suspended
    - Terminated
    - Completed
    - Withdrawn
    - Unknown Status
- Eligibility
    - Age
    - Sex
    - Accepts Healthy Volunteers
- Type
    - Interventional (Clinical Trial)
    - Observational
    - Patient Registries
    - Expanded Access
- Results
    - With Results
    - Without Results
- Study Phase
    - Early Phase 1
    - Phase 1
    - Phase 2
    - Phase 3
    - Phase 4
    - Not Applicable
- Funder Type
    - NIH
    - Other U.S. Federal Agency
    - Industry
    - All others (Individuals, Universities, Organizations)
- Documents
    - Study Protocols
    - Statistical Analysis Plans (SAPs)
    - Informed Consent Forms (ICFs)


##### EXAMPLE JSON OBJECT (Single Study)
```
{
    "nct_id": [
        "NCT04452825"
    ],
    "title": [
        "A New Psychotherapy Intervention for Older Cancer Patients"
    ],
    "acronym": [
        ""
    ],
    "status": [
        {
        "_": "Active, not recruiting",
        "$": {
            "open": "N"
        }
        }
    ],
    "study_results": [
        "No Results Available"
    ],
    "conditions": [
        {
        "condition": [
            "Cancer"
        ]
        }
    ],
    "interventions": [
        {
        "intervention": [
            {
            "_": "Cancer and Aging: Reflections for Elders (CARE) Intervention",
            "$": {
                "type": "Behavioral"
            }
            },
            {
            "_": "Social Work and Supportive Counseling (SWSC) Intervention",
            "$": {
                "type": "Behavioral"
            }
            }
        ]
        }
    ],
    "outcome_measures": [
        {
        "outcome_measure": [
            "Depression and Anxiety: Hospital Anxiety and Depression Scale (HADS)"
        ]
        }
    ],
    "sponsors": [
        {
        "lead_sponsor": [
            "Memorial Sloan Kettering Cancer Center"
        ]
        }
    ],
    "gender": [
        "All"
    ],
    "min_age": [
        "70 Years"
    ],
    "age_groups": [
        {
        "age_group": [
            "Older Adult"
        ]
        }
    ],
    "phases": [
        ""
    ],
    "enrollment": [
        "476"
    ],
    "funded_bys": [
        {
        "funded_by": [
            "Other"
        ]
        }
    ],
    "study_types": [
        "Observational"
    ],
    "exp_acc_types": [
        ""
    ],
    "study_designs": [
        {
        "study_design": [
            "Observational Model: Case-Control",
            "Time Perspective: Prospective"
        ]
        }
    ],
    "other_ids": [
        {
        "other_id": [
            "20-191"
        ]
        }
    ],
    "start_date": [
        "June 9, 2020"
    ],
    "primary_completion_date": [
        "June 2025"
    ],
    "completion_date": [
        "June 2025"
    ],
    "study_first_posted": [
        "June 30, 2020"
    ],
    "last_update_posted": [
        "June 30, 2020"
    ],
    "locations": [
        {
        "location": [
            "Memorial Sloan Kettering Cancer Center, New York, New York, United States"
        ]
        }
    ],
    "documents": [
        ""
    ],
    "url": [
        "https://ClinicalTrials.gov/show/NCT04452825"
    ]
}
```