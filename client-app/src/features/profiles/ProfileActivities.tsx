import { observer } from "mobx-react-lite";
import { Tab, Grid, CardGroup, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ActivityCard from "./ActivityCard";

export default observer(function ProfileActivities() {
    const {profileStore} = useStore();
    const {activities, loadingActivities} = profileStore;
    const panes = [
        {
          menuItem: 'Future Events',
          render: () => <Tab.Pane loading={loadingActivities} attached={false}>
                <CardGroup itemsPerRow={4}>
                    {activities.map(activity => (
                        <ActivityCard key={activity.title} activity={activity} />
                    ))}
                </CardGroup>
            </Tab.Pane>,
        },
        {
          menuItem: 'Past Events',
          render: () => <Tab.Pane loading={loadingActivities} attached={false}>
                <CardGroup itemsPerRow={4}>
                    {activities.map(activity => (
                        <ActivityCard key={activity.title} activity={activity} />
                    ))}
                </CardGroup>
            </Tab.Pane>,
        },
        {
          menuItem: 'Hosting',
          render: () => <Tab.Pane loading={loadingActivities} attached={false}>
                <CardGroup itemsPerRow={4}>
                    {activities.map(activity => (
                        <ActivityCard key={activity.title} activity={activity} />
                    ))}
                </CardGroup>
            </Tab.Pane>,
        },
      ]

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header 
                        floated='left' 
                        icon='calendar'
                        content={'Activites'} />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab 
                        
                        menu={{ secondary: true, pointing: true }} 
                        panes={panes}
                        onTabChange={(e, data) => profileStore.setEventActiveTab(data.activeIndex)}
                    />
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})