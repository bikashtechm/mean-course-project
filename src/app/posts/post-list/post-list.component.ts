import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from "../post.model"
import { PostsService } from "../posts.service"
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  // posts = [
  //   {
  //     title: 'First Post',
  //     content: 'This is first post'
  //   },
  //   {
  //     title: 'Second Post',
  //     content: 'This is second post'
  //   },
  //   {
  //     title: 'Third Post',
  //     content: 'This is third post'
  //   }
  // ];

  private postSub: Subscription;
  posts: Post[] =[];
  isLoading = false;
  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postSub = this.postsService.getPostUpdateListner()
    .subscribe( (posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }

}
