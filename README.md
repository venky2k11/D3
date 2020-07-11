# COVID-19 status analysis


Project URL:         https://venky2k11.github.io/vrb3_d3/

Messaging. What is the message you are trying to communicate with the narrative visualization?
	· Key Message: Analyse the impact of population density on COVID-19 spread around the world. 
		o Compare countries around the world on total number of laboratory confirmed cases.
		o Identify and compare top 10 impacted countries for confirmed and death cases. 
    o Analyse the COVID-19 timeline for top 2 impacted countries.
    
Narrative Structure. Which structure was your narrative visualization designed to follow (martini glass, interactive slide show or drop-down story)? How does your narrative visualization follow that structure? (All of these structures can include the opportunity to "drill-down" and explore. The difference is where that opportunity happens in the structure.)

	· The narrative visualization follows a Martini glass approach using 3 scenes.
		o First scene is author driven. User is presented with a Bubble map showing different countries and their count of confirmed cases in the form of bubble size as on 4th July 2020. User can hover over the chart to see additional information using tooltip and if needed, can change the date to see the COVID-19 status as on that date across the world.
		o In the second scene, a bar chart is used to display either the top 10 countries with confirmed cases or the top 10 countries with death cases. It is defaulted to confirmed cases. User can toggle between these charts using the trigger buttons available on top of this chart. Additional information is available using the tooltip on hovering on the bar charts. 
    o In the last scene, a timeline of confirmed cases is displayed with an option for user to filter on the country.  It is defaulted to “US” which can be changed. Here user has the option to visualize the timeline for any country they want to analyse further. Additional information is available on hovering over the line.
    
    
Visual Structure. What visual structure is used for each scene? How does it ensure the viewer can understand the data and navigate the scene? How does it highlight to urge the viewer to focus on the important parts of the data in each scene? How does it help the viewer transition to other scenes, to understand how the data connects to the data in other scenes?


	· Visualization follows a liner ordering with some interactivity to explore the data. 
	· There are three scenes and each of them follow a same pattern of:
			· Size of scene
			· Border
			· Legend
			· Colour 
			· Tooltips
				 
	· Size of the bubble in the bubble map is used to highlight level of impact of COVID-19 in that country.  Map view is used to display the countries with geographical coordinates.
	· Date parameter is used to display the COVID-19 confirmed case status as on that date. It is defaulted to 4th July 2020. 
	· Bar charts have been ordered from highest to lowest in the scene 2 for easier understanding. Height of the bar chart is used to represent this information along with colour coding according to the density group. 
	· Timeline chart has been used to display the trend of COVID-19 since January 2020. Y-axis gets scaled based on the countries data to give a clear view of the trend. 
	· 1st Scene: A Bubble map. This initial chart shows the COVID-19 status across the world in a consolidated manner and sets the stage for upcoming scenes. Countries are shown in the form of a world map and size of the bubble indicate the total number of confirmed COVID-19 cases. Larger the size of bubble, bigger has been the impact of COVID-19 for that country. Countries have been grouped into 5, based on their population density. This density is represented by different colours as shown in the legend. This approach of bubble map helps user with easier interpretation of the data instead of just bubble chart or a scatter map. For further details on the country name, total number of confirmed cases and density of the country, user can hover over the bubble to get more details. COVID-19 status for earlier dates could be visualized by changing the data parameter displayed next to the chart.
	· 2nd Scene: Upon visualizing the entire world data, next scene shows top 10 impacted countries. It is a bar chart, which by default, displays the top 10 countries with confirmed cases. Here user is provided with two buttons that could be used to toggle between top 10 countries for confirmed and death cases. The bars are coloured according to their density and follows a similar colour pattern as the 1st scene. On hovering over the bars, additional details are revealed. Legends and title are presented to give more clarity on what is being displayed.
	· 3rd Scene: Upon visualizing the top 10 impacted countries, user has the option to see the trend of COVID-19 since January for these countries. This trend could be used to validate if the effective measures are working. By default, it displays the timeline of US which could be changed using the drop-down box to any other country.
In addition to above three scenes, there is a brief description below each scene, narrating author's point of view. Date option in Scene 1, two buttons in scene 2 and drop-down box to select the country in the scene 3 provide interactivity. 


Scenes. What are the scenes of your narrative visualization? How are the scenes ordered, and why

	· There are three scenes in my narrative visualization.
		o Scene 1: Bubble Map showing spread of COVID19 cases across the world.
		o Scene 2: Bar chart showing top 10 impacted countries.
		o Scene 3: Trend analysis of each country.
	· Ordering of the scenes is based on below thought process:
		o 1st scene talks about the status across the whole world as on a given date. Then the 2nd scene talks about the top 10 impacted countries and the last scene shows the general trend of confirmed cases for these countries. 
    
	· Details of the scenes:
			· 1st Scene: A Bubble map. This initial chart shows the COVID-19 status across the world in a consolidated manner and sets the stage for upcoming scenes. Countries are shown in the form of a world map and size of the bubble indicate the total number of confirmed COVID-19 cases. Larger the size of bubble, bigger has been the impact of COVID-19 for that country. Countries have been grouped into 5, based on their population density. This density is represented by different colours as shown in the legend. This approach of bubble map helps user with easier interpretation of the data instead of just bubble chart or a scatter map. For further details on the country name, total number of confirmed cases and density of the country, user can hover over the bubble to get more details. COVID-19 status for earlier dates could be visualized by changing the data parameter displayed next to the chart.
			· 2nd Scene: Upon visualizing the entire world data, next scene shows top 10 impacted countries. It is a bar chart, which by default, displays the top 10 countries with confirmed cases. Here user is provided with two buttons that could be used to toggle between top 10 countries for confirmed and death cases. The bars are coloured according to their density and follows a similar colour pattern as the 1st scene. On hovering over the bars, additional details are revealed. Legends and title are presented to give more clarity on what is being displayed.
      · 3rd Scene: Upon visualizing the top 10 impacted countries, user has the option to see the trend of COVID-19 since January for these countries. This trend could be used to validate if the effective measures are working. By default, it displays the timeline of US which could be changed using the drop-down box to any other country.
      
      

Annotations. What template was followed for the annotations, and why that template? How are the annotations used to support the messaging? Do the annotations change within a single scene, and if so, how and why

	· In the Scene 1, bubble map has two annotations, highlighting the countries with highest and lowest number of COVID-19 cases. Country with highest cases was obvious however, the annotation is very useful in case of "Monaco" which has very high density and the lowest number of cases. 
  · In the Scene 3, the timeline chart has an annotation when country "US" is selected from the dropdown box. The annotation shows the period when the COVID-19 cases came down before raising again showing a start of probable 2nd wave.
  · Simple annotation of displaying the message in the chart was used. In the Scene 1, country with highest cases was clearly displayed however, the least impacted country was difficult to spot. The annotation was very useful in case of "Monaco" which has very high density and the lowest number of cases. This highlights the point that population density has little role to play when proper precautionary measures are taken.
  
  
Parameters. What are the parameters of the narrative visualization? What are the states of the narrative visualization? How are the parameters used to define the state and each scene?

  •	Scene 1 has one parameter. 
    o	Date
  •	Scene 2 has two parameters:
    o	Confirmed cases
    o	Death cases
  •	Scene 3 has one parameter:
    o	Country dropdown box
  •	By default, Scene 1 displays data for 4th July 2020 which could be changed by user. Based on the selected date, the corresponding COVID-19 information is displayed.
  •	By default, Scene 2 has "Confirmed cases" parameter selected. User could change it to "Death cases" to visualize top 10 countries where death cases are high. 
  •	Similarly, in Scene 3, Country is defaulted to "US" which could later be changed to any other whose timeline needs to be displayed. 
  •	Transition effect has been used in Scene 2 and Scene 3.


Triggers. What are the triggers that connect user actions to changes of state in the narrative visualization? What affordances are provided to the user to communicate to them what options are available to them in the narrative visualization?

  •	Scene 1 has the date parameter. When date is changed, the trigger event clears the existing HTML and re-populates it based on the selected date.
  •	Scene 2 has two buttons. One is to display the Top 10 countries with confirmed cases and the other one to display the top 10 countries with death cases. When hovered on them, they display the helping text. Both button fire events which clear the HTML and repopulate it with new data. 
  •	Scene 3 has one drop down box which is used to select the country for which the timeline needs to be displayed. When the country is changed, HTML is cleared and repopulated with new data. 


Technical Design:
  •	Index.html: This is the main HTML used for visualization. Each Scene described above has a separate JavaScript file which are invoked here.
  •	map_confirmed2.js: This is the source to display the Scene 1. It reads data from files “worldgeo.json” (geo location co-ordinates) and “confirmed_pivot2.csv” (COVID-19 data).
  •	Top10Confirmed.js: This is the source to display the Scene 2. It reads data from files “confirmed_latest_V2.csv” (COVID-19 confirmed cases) and “dead_latest.csv” (COVID-19 death cases).
  •	confirmed_timeline.js: This is the source to display the Scene 3. It reads the data from “confirmed_pivot2.csv” (COVID-19 data). 







      
      
