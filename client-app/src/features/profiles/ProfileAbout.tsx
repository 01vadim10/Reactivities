import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Grid, Header, Segment, Tab } from "semantic-ui-react";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
    profile: Profile
}

export default observer(function ProfileAbout({ profile }: Props) {
    const {
        profileStore: {
            isCurrentUser
        },
    } = useStore();

    const [editProfileMode, setEditProfileMode] = useState(false);

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icon="user" content={ "About " + profile.displayName } />
                    {isCurrentUser && (
                        <Button
                            floated="right"
                            basic
                            content={editProfileMode ? "Cancel" : "EditProfile"}
                            onClick={() => setEditProfileMode(!editProfileMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {editProfileMode ? (
                    <Formik 
                        enableReinitialize 
                        initialValues={profile} 
                        onSubmit={values => handleFormSubmit(values)}>
                        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                                <MyTextInput name='displayName' placeholder='Display Name' />
                                <MyTextArea rows={3} placeholder='Add your Bio' name='bio' />
                                <Button 
                                    disabled={isSubmitting || !dirty || !isValid}
                                    loading={isSubmitting} floated='right' 
                                    positive type='submit' content='Submit' 
                                />
                                <Button as={Link} to={`/profiles/${profile.username}`} floated='right' type='button' content='Cancel' />
                            </Form>
                        )}
                    </Formik>) : (
                    <Grid.Column width={16}>
                        <p>{profile.bio}</p>
                    </Grid.Column>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
});

function handleFormSubmit(profile: Profile): any {
    // if (!profile.displayName) {
    //     let newProfile = {
    //         ...profile,
    //         id: 
    //     };
    //     createprofile(newProfile).then(() => history.push(`/activities/${newProfile.id}`));
    // } else {
    //     updateprofile(profile).then(() => history.push(`/activities/${profile.id}`));
    // }
}
