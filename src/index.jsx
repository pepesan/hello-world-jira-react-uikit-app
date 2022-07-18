import ForgeUI, {
    render,
    User,
    UserGroup,
    Fragment,
    Text,
    Heading,
    IssuePanel,
    Button,
    ButtonSet,
    Code,
    Form,
    TextField,
    CheckboxGroup,
    Checkbox,
    Image,
    Tabs,
    Tab,
    Tag,
    Tooltip,
    useProductContext,
    useState } from "@forge/ui";

import api, { route } from "@forge/api";
const fetchCommentsForIssue = async (issueIdOrKey) => {
    const res = await api
        .asUser()
        .requestJira(route`/rest/api/3/issue/${issueIdOrKey}/comment`);

    const data = await res.json();
    return data.comments;
};

const exampleCodeBlock = `  // React Component
    class HelloMessage extends React.Component {
      render() {
        return (
          <div>
            Hello {this.props.name}
          </div>
        );
      }
    }

    ReactDOM.render(
      <HelloMessage name="Taylor" />,
      mountNode
    );
  `;

const App = () => {
    const context = useProductContext();
    const [comments] = useState(async () => await fetchCommentsForIssue(context.platformContext.issueKey));

    console.log(`Number of comments on this issue: ${comments.length}`);
    // uso de Code
    // <Code text={exampleCodeBlock} language="javascript" />
    const [formState, setFormState] = useState(undefined);
    const onSubmit = async (formData) => {
        setFormState(formData);
    };
    const goBack = () => {};
    const cancel = () => {};
    const actionButtons = [
        <Button text="Go back" onClick={goBack} />,
        <Button text="Cancel" onClick={cancel} />,
    ];
  return (
    <Fragment>
        <Tabs>
            <Tab label="Tab 1">
                <Text>
                    Number of comments on this issue: {comments.length}
                </Text>
                <Heading size="large">Title</Heading>
                <User accountId="5a1234bc8d12345e3f1g11hi" />
                <UserGroup>
                    <User accountId="5a1234bc8d12345e3f1g11hi"/>
                    <User accountId="2a98a42dbc7ab42e12ee360d"/>
                    <User accountId="5d8732lq8jg85a0e3f1g90as"/>
                    <User accountId="2h98a10dbl5ab93e62hja23z"/>
                    <User accountId="7b20f0bc2d05325e3f1g43ty"/>
                    <User accountId="2p72s42dbc7ab42e90gf252d"/>
                    <User accountId="2l01x78mf4pqw42e84fg40ad"/>
                </UserGroup>
                <ButtonSet>
                    <Button text="Allow"  />
                    <Button text="Deny"  />
                </ButtonSet>
                <Form onSubmit={onSubmit} actionButtons={actionButtons}>
                    <TextField name="username" label="Username" />
                    <CheckboxGroup name="products" label="Products">
                        <Checkbox defaultChecked value="jira" label="Jira" />
                        <Checkbox value="confluence" label="Confluence" />
                    </CheckboxGroup>
                </Form>
                {formState && <Text>{JSON.stringify(formState)}</Text>}<Image
                src="https://media.giphy.com/media/jUwpNzg9IcyrK/source.gif"
                alt="homer"
            />

                <Button
                    text="Hola Hola"
                    onClick={() => {
                        console.log("hola");
                    }}
                />
            </Tab>
            <Tab label="Tab 2">
                <Tag text="decision" />
                <Tag text="spec" color="blue-light" />
                <Tooltip text="Hello World">
                    <Button
                        text="Hover over me"
                        onClick={() => console.log("Hello World")}
                    />
                </Tooltip>
            </Tab>
        </Tabs>


    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
