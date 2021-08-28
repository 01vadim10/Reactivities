import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Grid, Header, Tab } from "semantic-ui-react";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
    profile: Profile
}

export default observer(function ProfileAbout({ profile }: Props) {
    const history = useHistory();
    const {profileStore} = useStore();
    const {isCurrentUser, updateProfile, loading} = profileStore;
    const [editProfileMode, setEditProfileMode] = useState(false);

    function handleFormSubmit(profile: Profile): any {
        setEditProfileMode(false);
        updateProfile(profile).then(() => history.push(`/profiles/${profile.username}`));
    }

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
                        {({ handleSubmit, isValid, dirty }) => (
                            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                                <MyTextInput name='displayName' placeholder='Display Name' />
                                <MyTextArea rows={3} placeholder='Add your Bio' name='bio' />
                                <Button 
                                    disabled={loading || !dirty || !isValid}
                                    loading={loading} floated='right' 
                                    positive type='submit' content='Update profile'
                                />
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



