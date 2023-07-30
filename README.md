# Seminar data
Store seminar data  
Providing seminar info data, utills for managing data  

# data form
data format  

## seminar info data

<details>
<summary>
DTO
</summary>

Seminar info DTO
|name|type|description|example|
|-|-|-|-|
|start|DateString|seminar start date|2020-11-11|
|end|DateString|seminar end date|2020-11-11|
|name|String|seminar name|2023H1|
|description|String|seminar info description|2023 H1 seminar|
|items|List\<SeminarItem\>|list of seminar info||

<br>

SeminarItem
|name|type|description|example|
|-|-|-|-|
|type|int|seminar type, 0=private 1=public|0|
|link|String|seminar additional link||
|name|String|seminar name|Computer Vision|
|organizers|List\<OrganizerItem\>|list of organizers||
|date|List<\DateString\>|list of seminar date|["2020-2-2","2020-3-2"]|
|description|String|description of seminar|basic of cv|
|keyword|List\<String\>|keywords of seminar|["cv","computer vision"]|

<br>

OrganizerItem
|name|type|description|example|
|-|-|-|-|
|name|String|name of organizer|devhooodit|
|link|String|link of organizer profile||
</details>

<details>
<summary>
example json
</summary>

```json
{
    "start": "YYYY-M-D",
    "end": "YYYY-M-D",
    "description": "seminar session description",
    "items": [
        {
            "type": 0,
            "link": "additional link of seminar",
            "name": "name of seminar",
            "organizers": [
                {
                    "name": "organizer name",
                    "link": "organizer link"
                }
            ],
            "date": [
                "YYYY-M-D"
            ],
            "description": "seminar description",
            "keyword": [
                "keyword"
            ]
        }
    ]
}
```
</details>

## seminar list data
<details>
<summary>DTO</summary>

SeminarListDTO
|name|type|description|example|
|-|-|-|-|
|items|List\<SeminarMetaDTO\>|seminar meta data||

SeminarMetaDTO
|name|type|description|example|
|-|-|-|-|
|name|String|seminar name|2023H1|
|code|String|seminar code|2023H1|
|datalink|String|seminar info data link|URL|
|link|String|seminar external link|URL|

</details>

<details>
<summary>example json</summary>


</details>