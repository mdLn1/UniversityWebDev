import React, { Component } from "react";
import Layout from "../components/Layout";
import {
  Grid,
  Segment,
  Header,
  Form,
  Select,
  Message
} from "semantic-ui-react";
import Deadlines from "../components/Deadlines";
import axios from "axios";
import AdminControl from "../components/AdminControl";
import UserEditPanel from "../components/UserEditPanel";
import cookies from "next-cookies";

export default class PortalData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: this.props.departments || [],
      roles: this.props.roles || [],
      categories: this.props.categories || [],
      users: this.props.users || [],
      connectionError: this.props.connectionError || false,
      roleError: false,
      categoryError: false,
      departmentError: false,
      countDownTimer: 5,
      currentDeadline: null
    };
  }

  static async getInitialProps(ctx) {
    const { token } = cookies(ctx);
    try {
      axios.defaults.headers.common["x-auth-token"] = token;
      let res = await axios.get("/api/departments");
      const { departments } = res.data || [];
      res = await axios.get("/api/roles");
      const { roles } = res.data || [];
      res = await axios.get("/api/categories");
      const { categories } = res.data || [];
      res = await axios.get("/api/management/deadlines");
      const { deadlines } = res.data || [];
      res = await axios.get("/api/management/users");
      const { users } = res.data || [];
      return {
        departments,
        deadlines,
        users,
        roles,
        categories
      };
    } catch (err) {
      return {
        departments: [],
        roles: [],
        categories: [],
        connectionError: "Could not connect to server"
      };
    }
  }

  componentDidMount() {
    const { deadlines } = this.props;
    if (deadlines && deadlines.length > 0) {
      const currDeadline = deadlines.find(
        x => new Date(x.CommentsSubmissionEnd.split("T")[0]) > new Date()
      );
      if (currDeadline) {
        this.setState({ currentDeadline: currDeadline });
      }
    }
    if (this.props.connectionError) {
      setTimeout(() => {
        window.location.reload();
      }, 5000);
      setInterval(
        () =>
          this.setState((prevState, props) => ({
            ...prevState,
            countDownTimer:
              prevState.countDownTimer > 0 ? prevState.countDownTimer - 1 : 0
          })),
        1000
      );
    }
  }
  updateValues = (type, values) => {
    this.setState({ [type]: values });
  };

  render() {
    const {
      categories,
      departments,
      roles,
      users,
      connectionError,
      countDownTimer,
      currentDeadline
    } = this.state;
    const { deadlines } = this.props;

    const categoryFields = [
      { type: "text", value: "", name: "tag", label: "Tag", required: true },
      {
        type: "text",
        value: "",
        name: "description",
        label: "Description",
        required: true
      },
      {
        type: "bool",
        value: true,
        name: "isSelectable",
        label: "Selectable",
        required: false
      }
    ];
    const roleFields = [
      { type: "text", value: "", name: "role", label: "Role", required: true },
      {
        type: "text",
        value: "",
        name: "description",
        label: "Description",
        required: true
      },
      {
        type: "bool",
        value: true,
        name: "isSelectable",
        label: "Selectable",
        required: false
      }
    ];
    const departmentFields = [
      {
        type: "text",
        value: "",
        name: "department",
        label: "Department",
        required: true
      },
      {
        type: "text",
        value: "",
        name: "description",
        label: "Description",
        required: true
      },
      {
        type: "bool",
        value: true,
        name: "isSelectable",
        label: "Selectable",
        required: false
      }
    ];
    return (
      <Layout>
        {connectionError && (
          <Message negative>
            <Message.Header>
              Sorry the connection to the server was interrupted
            </Message.Header>
            <p>{connectionError}</p>
            <p>Refreshing automatically in {countDownTimer} seconds</p>
          </Message>
        )}
        <Header size="large" style={{ textAlign: "center" }}>
          Portal Data Management
        </Header>
        <Grid stackable columns={3}>
          <Grid.Column>
            <Segment>
              <AdminControl
                title="categories"
                itemName="categorySelected"
                objName="category"
                listOptions={categories.map((el, index) => ({
                  key: index,
                  text: el.tag,
                  value: el.id
                }))}
                fields={categoryFields}
                listItems={categories}
                dropDownProp="tag"
                updateValues={this.updateValues}
                link="/api/categories/"
              />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <AdminControl
                title="departments"
                itemName="departmentSelected"
                objName="department"
                listOptions={departments.map((el, index) => ({
                  key: index,
                  text: el.department,
                  value: el.id
                }))}
                fields={departmentFields}
                dropDownProp="department"
                updateValues={this.updateValues}
                listItems={departments}
                link="/api/departments/"
              />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <AdminControl
                title="roles"
                itemName="roleSelected"
                dropDownProp="role"
                objName="role"
                listOptions={roles.map((el, index) => ({
                  key: index,
                  text: el.role,
                  value: el.id
                }))}
                listItems={roles}
                updateValues={this.updateValues}
                fields={roleFields}
                link="/api/roles/"
              />
            </Segment>
          </Grid.Column>
          {currentDeadline && (
            <Grid.Column>
              <Segment>
                <Deadlines currDeadline={{ ...currentDeadline }} />
              </Segment>
            </Grid.Column>
          )}
          {!currentDeadline && deadlines && deadlines.length > 0 && (
            <Grid.Column>
              <Segment>
                <Deadlines currDeadline={{ ...deadlines[0] }} />
              </Segment>
            </Grid.Column>
          )}
          {users.length > 0 && departments.length > 0 && roles.length > 0 && (
            <Grid.Column>
              <Segment>
                <UserEditPanel
                  users={users}
                  departments={departments}
                  roles={roles}
                />
              </Segment>{" "}
            </Grid.Column>
          )}
        </Grid>
      </Layout>
    );
  }
}
