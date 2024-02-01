import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Tests the rendering of the Blog component", () => {
  const userInfo = {
    username: "takay",
    name: "Strove",
    id: "6500a804928ff98e8e9dfc14",
  };
  const dummyBlogPost = {
    title: "This is a test blog post",
    id: "6500a804928ff98e8e9dfc14",
    user: {
      ...userInfo,
    },
    likes: 5,
    author: "Audio Friend",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  };

  let container;
  const updateMockHandler = jest.fn();
  const deleteMockHandler = jest.fn();

  beforeEach(() => {
    container = render(
      <Blog
        blog={dummyBlogPost}
        user={userInfo}
        updateHandler={updateMockHandler}
        deleteHandler={deleteMockHandler}
      />,
    ).container;
  });

  test("renders blog title and blog author", () => {
    //const { container } = render(<Blog blog={dummyBlogPost} user={userInfo} updateHandler={mockHandler} deleteHandler={mockHandler}/>)

    const div = container.querySelector(".blog");
    expect(div).toHaveTextContent(
      dummyBlogPost.title + " " + dummyBlogPost.author,
    );
  });

  test("renders url and likes", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const urlElement = screen.getByText(dummyBlogPost.url);
    expect(urlElement).toBeDefined();

    const likesElement = screen.getByText("likes " + dummyBlogPost.likes);
    expect(likesElement).toBeDefined();
  });

  test("two likes button clicks trigger the handler twice", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const likesButton = screen.getByText("like");
    await user.click(likesButton);
    await user.click(likesButton);

    expect(updateMockHandler.mock.calls).toHaveLength(2);
  });
});
